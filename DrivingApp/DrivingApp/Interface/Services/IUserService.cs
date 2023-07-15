using DrivingApp.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface IUserService
	{
		Task<UserResponseDto> GetAsync(long userId);

		Task<bool> VerifyAsync(long userId);

		Task<List<UserResponseDto>> GetInstructorsBySchool(long schoolId, short categoryId);

		Task<List<UserResponseDto>> GetAllUsersAsync();

		void Delete(long id);

		Task<UserResponseDto> Update(long userId, UserUpdateDto updateUser);

		Task<UserResponseDto> ChooseInstructor(long studentId, long instructorId);

		Task<UserResponseDto> PassTheoryStudent(long id);
	}
}
