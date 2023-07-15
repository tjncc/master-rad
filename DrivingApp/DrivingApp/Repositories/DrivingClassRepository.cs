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

namespace DrivingApp.Repositories
{
	public class DrivingClassRepository : IDrivingClassRepository
	{
		private readonly DrivingAppContext _context;

		public DrivingClassRepository(DrivingAppContext context)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
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
			return await _context.DrivingClasses.FirstOrDefaultAsync(c => c.Id == id);
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
	}
}
