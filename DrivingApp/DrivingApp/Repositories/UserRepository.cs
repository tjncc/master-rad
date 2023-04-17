using AutoMapper;
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
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
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

		public async Task<List<Instructor>> GetInstructorsBySchool(long schoolId)
		{
            return await _context.Instructors.Where(ins => ins.SchoolId == schoolId).ToListAsync();
		}
	}
}
