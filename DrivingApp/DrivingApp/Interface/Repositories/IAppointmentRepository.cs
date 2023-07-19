using DrivingApp.Dto;
using DrivingApp.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Repositories
{
	public interface IAppointmentRepository
	{
		Task<Appointment> GetAsync(long id);

		Task<List<Appointment>> GetByUserIdAsync(long userId, short role);

		Task<Appointment> AddAsync(Appointment appointment);

		Task<bool> CheckTimeAsync(AppointmentDto appointmentDto);

		Task<bool> CheckExamConditionsAsync(AppointmentDto appointmentDto);

		Task<Appointment> ConfirmEvent(Appointment appointment);

		Task RemoveEvent(Appointment appointment);

		Task<Appointment> UpdateExamResults(Appointment appointment, bool hasPassed);
	}
}
