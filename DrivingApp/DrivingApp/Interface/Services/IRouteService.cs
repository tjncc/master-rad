using DrivingApp.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface IRouteService
	{
		Task<RouteDto> GetAsync(long id);

		Task<List<SimpleRouteDto>> GetByStudentIdAsync(long studentId);

		Task<RouteDto> AddAsync(RouteDto routeDto);

		Task DeleteAsync(long id);
	}
}
