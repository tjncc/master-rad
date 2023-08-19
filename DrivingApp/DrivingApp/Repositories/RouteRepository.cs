using DrivingApp.Database;
using System;
using DrivingApp.Interface.Repositories;
using System.Threading.Tasks;
using DrivingApp.Model;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using DrivingApp.Common.Exceptions;

namespace DrivingApp.Repositories
{
	public class RouteRepository : IRouteRepository
	{
		private readonly DrivingAppContext _context;
		public RouteRepository(DrivingAppContext context)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
		}

		public async Task<Route> GetAsync(long id)
		{
			return await _context.Routes.FirstOrDefaultAsync(r => r.Id == id);
		}

		public async Task<List<Route>> GetByStudentIdAsync(long studentId)
		{
			return await _context.Routes.Where(r => r.StudentId == studentId).ToListAsync();
		}

		public async Task<Route> AddAsync(Route route)
		{
			await _context.Routes.AddAsync(route);
			await _context.SaveChangesAsync();

			return await GetAsync(route.Id);
		}

		public async Task DeleteAync(long id)
		{
			Route route = await GetAsync(id);
			if (route == null)
			{
				throw new MyException("This route doesn't exists");
			}
			_context.Routes.Remove(route);
			await _context.SaveChangesAsync();
		}
	}
}
