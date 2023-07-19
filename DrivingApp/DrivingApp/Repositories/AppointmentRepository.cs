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
using DrivingApp.Common.Enum;

namespace DrivingApp.Repositories
{
	public class AppointmentRepository : IAppointmentRepository
	{
		private readonly DrivingAppContext _context;

		public AppointmentRepository(DrivingAppContext context)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
		}

		public async Task<Appointment> AddAsync(Appointment appointment)
		{
			if (appointment.InstructorId.HasValue)
			{
				appointment.Instructor = await _context.Instructors.Where(ins => ins.Id == appointment.InstructorId).SingleOrDefaultAsync();
			}

			if (appointment.ExaminerId.HasValue)
			{
				appointment.Examiner = await _context.Examiners.Where(ex => ex.Id == appointment.ExaminerId).SingleOrDefaultAsync();
			}

			if (appointment.IsExam)
			{
				appointment.ExamStatus = ExamStatus.Unvoted;
			}

			appointment.Student = await _context.Students.Where(student => student.Id == appointment.StudentId).SingleOrDefaultAsync();
			
			await _context.Appointments.AddAsync(appointment);
			await _context.SaveChangesAsync();

			return await GetAsync(appointment.Id);
		}

		public async Task<Appointment> GetAsync(long id)
		{
			var appointment = await _context.Appointments.FirstOrDefaultAsync(c => c.Id == id);
			if (appointment == null)
			{
				throw new MyException("This event doesn't exist!");
			}

			return appointment;
		}

		public async Task<List<Appointment>> GetByUserIdAsync(long userId, short role)
		{
			var appointments = _context.Appointments.Include(ap => ap.Instructor)
													.Include(ap => ap.Student)
													.Include(ap => ap.Examiner);

			var instructorId = await _context.Students.Where(c => c.Id == userId).Select(st => st.InstructorId).FirstOrDefaultAsync();

			if ((Role)role == Role.Student)
			{
				return await appointments.Where(ap => (ap.StudentId == userId) || 
											   (ap.InstructorId == instructorId)).ToListAsync();
			}
			else if ((Role)role == Role.Examiner)
			{
				return await appointments.Where(ap => ap.ExaminerId == userId).ToListAsync();
			}
			else if ((Role)role == Role.Instructor)
			{
				return await appointments.Where(ap => ap.InstructorId == userId).ToListAsync();
			}

			return new List<Appointment>();
		}

		public async Task<bool> CheckTimeAsync(AppointmentDto appointmentDto)
		{
			var hasPassed = await _context.Appointments.AnyAsync(c => (c.StudentId == appointmentDto.StudentId) &&
																	   c.ExamStatus == ExamStatus.Passed);

			if (hasPassed)
			{
				throw new MyException("You can't make an appointment because you have passed the driving exam!");
			}

			if (appointmentDto.StartTime < DateTime.UtcNow)
			{
				throw new MyException("You must choose date and time in the future!");
			}

			var hasUnvotedExam = await _context.Appointments.AnyAsync(c => (c.StudentId == appointmentDto.StudentId) &&
																			appointmentDto.IsExam &&
																			c.ExamStatus == ExamStatus.Unvoted);

			if (hasUnvotedExam)
			{
				throw new MyException("You can't make make another exam appointment until examiner votes!");
			}

			var hasExamInFuture = await _context.Appointments.AnyAsync(c => (c.StudentId == appointmentDto.StudentId) &&
																			 c.IsExam &&
																			 c.StartTime < appointmentDto.EndTime &&
																			 c.ExamStatus == ExamStatus.Unvoted);

			if (hasExamInFuture)
			{
				throw new MyException("You can't make class appointment after the exam in the future!");
			}


			var hasClass = await _context.Appointments.AnyAsync(c => (c.InstructorId == appointmentDto.InstructorId || c.StudentId == appointmentDto.StudentId) &&
																  c.StartTime < appointmentDto.EndTime && c.EndTime > appointmentDto.StartTime);

			return hasClass;
		}

		public async Task<bool> CheckExamConditionsAsync(AppointmentDto appointmentDto)
		{
			var hasPassed = await _context.Appointments.AnyAsync(c => (c.StudentId == appointmentDto.StudentId) &&
																	   c.ExamStatus == ExamStatus.Passed);

			if (hasPassed)
			{
				throw new MyException("You can't make an appointment because you have passed the driving exam!");
			}

			var hasLeftClasses = await _context.Appointments.AnyAsync(c => (c.StudentId == appointmentDto.StudentId) &&
																			c.Student.NumberOfClasses > 0);

			if (hasLeftClasses)
			{
				throw new MyException("You can't have an exam until you finish 40 classes!");
			}

			var hasClassInFuture = await _context.Appointments.AnyAsync(c => (c.StudentId == appointmentDto.StudentId) &&
																	   appointmentDto.StartTime < c.EndTime);

			if (hasClassInFuture)
			{
				throw new MyException("You can't make an exam appointment before all class apointments that you have!");
			}

			if (appointmentDto.StartTime < DateTime.UtcNow)
			{
				throw new MyException("You must choose date and time in the future!");
			}

			var hasUnvotedExam = await _context.Appointments.AnyAsync(c => (c.StudentId == appointmentDto.StudentId) &&
																			c.ExamStatus == ExamStatus.Unvoted);

			if (hasUnvotedExam)
			{
				throw new MyException("You can't make take another exam appointment until examiner votes!");
			}

			var hasExamInFuture = await _context.Appointments.AnyAsync(c => (c.StudentId == appointmentDto.StudentId) &&
																			 c.IsExam &&
																			 c.EndTime > DateTime.UtcNow);

			if (hasExamInFuture)
			{
				throw new MyException("You can't make take another exam appointment!");
			}

			var hasClass = await _context.Appointments.AnyAsync(c => (c.StudentId == appointmentDto.StudentId) &&
																c.StartTime < appointmentDto.EndTime && c.EndTime > appointmentDto.StartTime);

			return hasClass;
		}

		public async Task<Appointment> ConfirmEvent(Appointment appointment)
		{
			appointment.IsConfirmed = true;
			await _context.SaveChangesAsync();

			return await GetAsync(appointment.Id);
		}

		public async Task RemoveEvent(Appointment appointment)
		{
			_context.Appointments.Remove(appointment);
			await _context.SaveChangesAsync();
		}

		public async Task<Appointment> UpdateExamResults(Appointment appointment, bool hasPassed)
		{
			if (hasPassed)
			{
				appointment.ExamStatus = ExamStatus.Passed;
			}
			else
			{
				appointment.ExamStatus = ExamStatus.Failed;
			}
			
			await _context.SaveChangesAsync();

			return await GetAsync(appointment.Id);
		}
	}
}
