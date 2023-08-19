using DrivingApp.Dto;
using DrivingApp.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Repositories
{
	public interface IRouteRepository
	{
		Task<Route> GetAsync(long id);

		Task<List<Route>> GetByStudentIdAsync(long studentId);

		Task<Route> AddAsync(Route route);

		Task DeleteAync(long id);
	}
}
