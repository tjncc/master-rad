using DrivingApp.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface IDrivingClassService
	{
		Task<DrivingClassDto> GetAsync(long id);

		Task<List<DrivingClassDto>> GetByUserIdAsync(long userId);

		Task<DrivingClassDto> AddAsync(DrivingClassDto drivingClassDto);
	}
}
