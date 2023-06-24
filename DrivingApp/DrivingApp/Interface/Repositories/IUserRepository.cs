using DrivingApp.Dto;
using DrivingApp.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Repositories
{
	public interface IUserRepository
	{
		Task<User> GetAsync(long userId);

		Task<bool> VerifyAsync(long id);

		Task<List<Instructor>> GetInstructorsBySchool(long schoolId);

		Task<List<User>> GetAllUsersAsync();

		void Delete(long id);

		Task<User> Update(long id, UserUpdateDto updateUser);
	}
}
