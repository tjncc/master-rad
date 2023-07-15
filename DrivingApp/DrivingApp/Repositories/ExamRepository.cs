using DrivingApp.Database;
using System;
using DrivingApp.Interface.Repositories;
using System.Threading.Tasks;
using DrivingApp.Model;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DrivingApp.Repositories
{
	public class ExamRepository : IExamRepository
	{
		private readonly DrivingAppContext _context;

		public ExamRepository(DrivingAppContext context)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
		}

		public async Task<Exam> AddAsync(Exam exam)
		{
			await _context.Exams.AddAsync(exam);
			await _context.SaveChangesAsync();

			return await GetAsync(exam.Id);
		}

		public async Task<Exam> GetAsync(long id)
		{
			return await _context.Exams.FirstOrDefaultAsync(c => c.Id == id);
		}

		public async Task<List<Exam>> GetByUserIdAsync(long userId)
		{
			return await _context.Exams.Where(c => (c.StudentId == userId) || (c.ExaminerId == userId)).ToListAsync();
		}
	}
}
