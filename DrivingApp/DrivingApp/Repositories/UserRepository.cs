using AutoMapper;
using DrivingApp.Database;
using DrivingApp.Interface.Repositories;
using DrivingApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DrivingApp.Repositories
{
	public class UserRepository : IUserRepository
	{
        private readonly DrivingAppContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DrivingAppContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
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
	}
}
