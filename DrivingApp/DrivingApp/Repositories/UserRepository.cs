using AutoMapper;
using DrivingApp.Common.Enum;
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
                throw new ArgumentNullException("This user doesn't exists");
            }
        }
	}
}
