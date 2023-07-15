using DrivingApp.Database;
using System;
using DrivingApp.Interface.Repositories;
using System.Threading.Tasks;
using DrivingApp.Model;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using DrivingApp.Common.Exceptions;
using DrivingApp.Dto;
using SendGrid.Helpers.Mail;
using DrivingApp.Common.Enum;
using SendGrid;

namespace DrivingApp.Repositories
{
	public class DrivingClassRepository : IDrivingClassRepository
	{
		private readonly DrivingAppContext _context;
		private readonly IUserRepository _userRepository;

		public DrivingClassRepository(DrivingAppContext context, IUserRepository userRepository)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
			_userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
		}

		public async Task<DrivingClass> AddAsync(DrivingClass drivingClass)
		{
			drivingClass.Instructor = await _context.Instructors.Where(ins => ins.Id == drivingClass.InstructorId).SingleOrDefaultAsync();
			drivingClass.Student = await _context.Students.Where(student => student.Id == drivingClass.StudentId).SingleOrDefaultAsync();
			
			await _context.DrivingClasses.AddAsync(drivingClass);
			await _context.SaveChangesAsync();

			return await GetAsync(drivingClass.Id);
		}

		public async Task<DrivingClass> GetAsync(long id)
		{
			var drivingClass = await _context.DrivingClasses.FirstOrDefaultAsync(c => c.Id == id);
			if (drivingClass == null)
			{
				throw new MyException("This event doesn't exist!");
			}

			return drivingClass;
		}

		public async Task<List<DrivingClass>> GetByUserIdAsync(long userId)
		{
			return await _context.DrivingClasses.Include(cl => cl.Instructor)
												.Include(cl => cl.Student)
												.Where(c => (c.StudentId == userId) || (c.InstructorId == userId)).ToListAsync();
		}

		public async Task<bool> CheckTimeAsync(DrivingClassDto classDto)
		{
			if (classDto.StartTime < DateTime.UtcNow)
			{
				throw new MyException("You must choose date and time in the future!");
			}

			return await _context.DrivingClasses.AnyAsync(c => (c.InstructorId == classDto.InstructorId || c.StudentId == classDto.StudentId) &&
																c.StartTime < classDto.EndTime && c.EndTime > classDto.StartTime);
		}

		public async Task<DrivingClass> ConfirmEvent(long id)
		{
			var drivingClass = await GetAsync(id);

			if (drivingClass.StartTime < DateTime.UtcNow)
			{
				throw new MyException("You can't confirm task from the past!");
			}

			drivingClass.IsConfirmed = true;
			await _context.SaveChangesAsync();

			var student = await _userRepository.GetAsync(drivingClass.StudentId);
			var instructor = await _userRepository.GetAsync(drivingClass.InstructorId);

			var client = new SendGridClient("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");
			var sendGridMessageStudent = GetSendGridMessage(drivingClass.IsConfirmed, drivingClass.StartTime, student.Name, student.Email);
			await client.SendEmailAsync(sendGridMessageStudent);

			return await GetAsync(drivingClass.Id);
		}

		public async Task RemoveEvent(long id)
		{
			var drivingClass = await GetAsync(id);

			if (drivingClass.StartTime < DateTime.UtcNow)
			{
				throw new MyException("You can't remove task from the past!");
			}

			var student = await _userRepository.GetAsync(drivingClass.StudentId);

			var client = new SendGridClient("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");
			var sendGridMessageStudent = GetSendGridMessage(false, drivingClass.StartTime, student.Name, student.Email);
			await client.SendEmailAsync(sendGridMessageStudent);

			if (drivingClass.IsConfirmed)
			{
				var instructor = await _userRepository.GetAsync(drivingClass.InstructorId);
				var sendGridMessageInstructor = GetSendGridMessage(false, drivingClass.StartTime, instructor.Name, instructor.Email);
				await client.SendEmailAsync(sendGridMessageInstructor);
			}

			_context.DrivingClasses.Remove(drivingClass);
			await _context.SaveChangesAsync();
		}

		private SendGridMessage GetSendGridMessage(bool isConfirmed, DateTime classTime, string name, string email)
		{

			var subject = isConfirmed ? "Class approved" : "Class canceled";

			SendGridMessage sendGridMessage = new SendGridMessage()
			{
				Subject = isConfirmed ? "Class approved" : "Class removed",
				From = new EmailAddress("tamara.jancic@hotmail.com", "Tamara"),
				ReplyTo = new EmailAddress("tamara.jancic@hotmail.com"),
				TemplateId = "d-7088fb4024a04e3f93b22b0af148832a",

				Personalizations = new List<Personalization>()
				{
					new Personalization()
					{
						Tos = new List<EmailAddress>()
						{
							new EmailAddress(email)
						},
						TemplateData = new Dictionary<string, string>
						{
							{ "name", name },
							{ "isConfirmed", isConfirmed.ToString().ToLower() },
							{ "classTime", classTime.ToString("dd-MM-yyyy, HH:mm") },
							{ "subject", subject },
						}
					}
				}
			};

			return sendGridMessage;
		}
	}
}
