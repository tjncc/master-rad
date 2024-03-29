﻿using DrivingApp.Common.Enum;
using DrivingApp.Common.Exceptions;
using DrivingApp.Database;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DrivingApp.Repositories
{
	public class AuthRepository : IAuthRepository
	{
		private readonly DrivingAppContext _context;
		private readonly ITokenService _tokenService;
        private readonly IConfiguration _config;

        public AuthRepository(DrivingAppContext context, ITokenService tokenService, IConfiguration config)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
			_tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
            _config = config ?? throw new ArgumentNullException(nameof(config));
		}

        public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto loginRequest)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == loginRequest.Email);

            if (user == null)
            {
                throw new MyException("User doesn't exist");
            };

            if (!user.IsVerified)
            {
                throw new MyException("Email isn't verified");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginRequest.Password));

            for (int i = 0; i < user.PasswordHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    throw new MyException("Wrong email or password");
                }
            }

            return new LoginResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role.ToString(),
                Token = _tokenService.CreateTokenUser(user),
            };
        }

        public async Task<ActionResult<RegistrationResponseDto>> Register(RegistrationRequestDto registrationRequest)
        {
            if (await UserExists(registrationRequest.Email)) throw new MyException("Account with this email already exists.");

            await RegisterUserByRole(registrationRequest);

            User user = _context.Users.Where(u => u.Email == registrationRequest.Email).SingleOrDefault();

            var client = new SendGridClient(_config.GetValue<string>("SendGridApiKey"));
            var sendGridMessage = GetSendGridMessage(registrationRequest, user.Id);

            var response = await client.SendEmailAsync(sendGridMessage);

            return new RegistrationResponseDto
            {
                Id = user.Id,
                Role = registrationRequest.Role,
                Email = registrationRequest.Email,
                Token = _tokenService.CreateToken((user))
            };
        }

        private async Task RegisterUserByRole(RegistrationRequestDto registrationRequest)
		{
            using var hmac = new HMACSHA512();
            if (registrationRequest.Role.Equals(Role.Admin))
			{
                var admin = new Admin
                {
                    PasswordSalt = hmac.Key,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationRequest.Password)),
                    Name = registrationRequest.Name,
                    LastName = registrationRequest.LastName,
                    Email = registrationRequest.Email,
                    Role = registrationRequest.Role,
                };
                _context.Admins.Add(admin);
            }
            else if (registrationRequest.Role.Equals(Role.Examiner))
			{
                var examiner = new Examiner
                {
                    PasswordSalt = hmac.Key,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationRequest.Jmbg.ToString())),
                    Name = registrationRequest.Name,
                    LastName = registrationRequest.LastName,
                    Email = registrationRequest.Email,
                    Role = registrationRequest.Role,
                    PhoneNumber = registrationRequest.PhoneNumber.Value,
                    DateOfBirth = registrationRequest.DateOfBirth.Value,
                    Jmbg = registrationRequest.Jmbg.Value,
                    Category = registrationRequest.Category.Value
                };
                _context.Examiners.Add(examiner);
            }
            else if (registrationRequest.Role.Equals(Role.Instructor)) 
            {
                var school = _context.Schools.Find(registrationRequest.SchoolId.Value);
                var instructor = new Instructor
                {
                    PasswordSalt = hmac.Key,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationRequest.Jmbg.ToString())),
                    Name = registrationRequest.Name,
                    LastName = registrationRequest.LastName,
                    Email = registrationRequest.Email,
                    Role = registrationRequest.Role,
                    PhoneNumber = registrationRequest.PhoneNumber.Value,
                    DateOfBirth = registrationRequest.DateOfBirth.Value,
                    Jmbg = registrationRequest.Jmbg.Value,
                    Category = registrationRequest.Category.Value,
                    SchoolId = registrationRequest.SchoolId.Value
                };
                _context.Instructors.Add(instructor);
                school.Instructors.Add(instructor);
            }
            else if (registrationRequest.Role.Equals(Role.Student))
			{

                var school = _context.Schools.Find(registrationRequest.SchoolId.Value);
                var student = new Student
                {
                    PasswordSalt = hmac.Key,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationRequest.Password)),
                    Name = registrationRequest.Name,
                    LastName = registrationRequest.LastName,
                    Email = registrationRequest.Email,
                    Role = registrationRequest.Role,
                    PhoneNumber = registrationRequest.PhoneNumber.Value,
                    DateOfBirth = registrationRequest.DateOfBirth.Value,
                    Jmbg = registrationRequest.Jmbg.Value,
                    Category = registrationRequest.Category.Value,
                    SchoolId = registrationRequest.SchoolId.Value,
                    NumberOfClasses = 40,
                    NumberOfExams = 0,
                    PassedTheory = false,
                    PassedDriving = false
                };
                _context.Students.Add(student);
                school.Students.Add(student);
            }
            
            await _context.SaveChangesAsync();
        }

        private async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        private SendGridMessage GetSendGridMessage(RegistrationRequestDto registrationRequest, long id)
		{
            var url = _config.GetValue<string>("VerificationLink") + id;
            var name = registrationRequest.Name;
            var subject = "Verify your email";
            var isInstructor = registrationRequest.Role.Equals(Role.Instructor);
            var isExaminer = registrationRequest.Role.Equals(Role.Examiner);

            SendGridMessage sendGridMessage = new SendGridMessage()
            {
                Subject = "Driving App Verification",
                From = new EmailAddress("tamara.jancic@hotmail.com", "Tamara"),
                ReplyTo = new EmailAddress("tamara.jancic@hotmail.com"),
                TemplateId = _config.GetValue<string>("SendGridApiKey"),
                Personalizations = new List<Personalization>()
                {
                    new Personalization()
                    {
                        Tos = new List<EmailAddress>()
                        {
                            new EmailAddress(registrationRequest.Email)
                        },
                        TemplateData = new Dictionary<string, string>
                        {
                            { "name", name },
                            { "url", url },
                            { "subject", subject },
							{ "isInstructor", isInstructor.ToString().ToLower() },
                            { "isExaminer", isExaminer.ToString().ToLower() }
                        }
                    }
                }
            };

            return sendGridMessage;
        }

		public async Task<User> VerifyEmail(long userId)
		{
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            user.IsVerified = true;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }
	}
}
