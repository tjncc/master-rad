using DrivingApp.Dto;
using DrivingApp.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Repositories
{
	public interface IDrivingClassRepository
	{
		Task<DrivingClass> GetAsync(long id);

		Task<List<DrivingClass>> GetByUserIdAsync(long userId);

		Task<DrivingClass> AddAsync(DrivingClass drivingClass);

		Task<bool> CheckTimeAsync(DrivingClassDto classDto);

		Task<DrivingClass> ConfirmEvent(long id);

		Task RemoveEvent(long id);
	}
}
