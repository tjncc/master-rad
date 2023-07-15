﻿using DrivingApp.Common.Enum;
using DrivingApp.Common.Exceptions;
using DrivingApp.Database;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrivingApp.Repositories
{
	public class UserRepository : IUserRepository
	{
        private readonly DrivingAppContext _context;
        public UserRepository(DrivingAppContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<User> GetAsync(long userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
			{
                throw new MyException("User doesn't exists");
            }
            return user;
        }

		public async Task<bool> VerifyAsync(long id)
		{
			User user = await GetAsync(id);

            if (user != null && !user.IsVerified)
			{
                user.IsVerified = true;
                await _context.SaveChangesAsync();
                return true;
            }
            else
			{
                return false;
			}

		}

		public async Task<List<Instructor>> GetInstructorsBySchool(long schoolId, short categoryId)
		{
            var instructors = new List<Instructor>();
            if (categoryId == 999)
			{
                instructors = await _context.Instructors.Where(ins => ins.SchoolId == schoolId).ToListAsync();

            } else 
			{
                instructors = await _context.Instructors.Where(ins => ins.SchoolId == schoolId && (short)ins.Category == categoryId).ToListAsync();
            }

            return instructors;
		}

		public async Task<List<User>> GetAllUsersAsync()
		{
			return await _context.Users.Where(u => u.Role != Role.Admin).ToListAsync();
		}

		public void Delete(long id)
		{
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
			else
			{
                throw new MyException("This user doesn't exists");
            }
        }

		public async Task<User> Update(long id, UserUpdateDto updateUser)
		{
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
			{
                throw new MyException("This user doesn't exists");
            }

             if (user.Role == Role.Student)
			{
                Student student = user as Student;
                student.Email = updateUser.Email;
                student.PhoneNumber = updateUser.PhoneNumber;
            } 
            else if (user.Role == Role.Instructor)
			{
                Instructor instructor = user as Instructor;
                instructor.Email = updateUser.Email;
                instructor.PhoneNumber = updateUser.PhoneNumber;
            }
            else if (updateUser.Role == Role.Examiner)
            {
                Examiner examiner = user as Examiner;
                examiner.Email = updateUser.Email;
                examiner.PhoneNumber = updateUser.PhoneNumber;
            }
            _context.SaveChanges();
            return user;
        }

		public async Task<Student> ChooseInstructor(long studentId, long instructorId)
		{
            var student = await GetAsync(studentId);
            var instructor = await GetAsync(instructorId);

            Student studentUpdate = student as Student;
            studentUpdate.InstructorId = instructorId;

            _context.SaveChanges();
            return studentUpdate;
        }

		public async Task<Student> PassTheoryStudent(long id)
		{
            var user = await GetAsync(id);
            Student student = user as Student;
            if (!student.PassedTheory)
			{
                student.PassedTheory = true;
                _context.SaveChanges();
                return student;
            }
			else
			{
                throw new MyException("This student have already passed theory");
            }
        }
	}
}
