using DrivingApp.Dto;
using DrivingApp.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface IAppointmentService
	{
		Task<AppointmentDto> GetAsync(long id);

		Task<List<AppointmentDto>> GetByUserIdAsync(long userId, short role);

		Task<AppointmentDto> AddAsync(AppointmentDto appointmentDto);

		Task<AppointmentDto> ConfirmEvent(long id);

		Task RemoveEvent(long id);

		Task<AppointmentDto> UpdateExamResults(long id, bool hasPassed);
	}
}
