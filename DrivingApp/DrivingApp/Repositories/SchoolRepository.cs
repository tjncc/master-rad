using DrivingApp.Database;
using DrivingApp.Interface.Repositories;
using DrivingApp.Model;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Repositories
{
	public class SchoolRepository : ISchoolRepository
	{
		private readonly DrivingAppContext _context;
		public SchoolRepository(DrivingAppContext context)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
		}

		public async Task<School> GetAsync(long id)
		{
			return await _context.Schools.FirstOrDefaultAsync(u => u.Id == id);
		}

		public async Task<List<School>> GetAllAsync()
		{
			return await _context.Schools.ToListAsync();
		}

		public async Task<School> AddAsync(School school)
		{
			await _context.Schools.AddAsync(school);
			await _context.SaveChangesAsync();

			return await GetAsync(school.Id);
		}

		public async Task DeleteAync(long id)
		{
			School school = await GetAsync(id);
			_context.Remove(school);
			await _context.SaveChangesAsync();
		}

		public async Task<School> UpdateAsync(long id, JsonPatchDocument<School> school)
		{
			School oldSchool = await GetAsync(id);
			school.ApplyTo(oldSchool);
			await _context.SaveChangesAsync();

			return await GetAsync(id);
			
		}
	}
}
