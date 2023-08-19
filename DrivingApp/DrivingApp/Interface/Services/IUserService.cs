using DrivingApp.Dto;
using DrivingApp.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface IUserService
	{
		Task<UserResponseDto> GetAsync(long userId);

		Task<bool> VerifyAsync(long userId);

		Task<List<UserResponseDto>> GetInstructorsBySchool(long schoolId, short categoryId);

		Task<List<UserResponseDto>> GetStudentsByInstructor(long instructorId);

		Task<List<UserResponseDto>> GetAllUsersAsync();

		void Delete(long id);

		Task<UserResponseDto> Update(long userId, UserUpdateDto updateUser);

		Task<UserResponseDto> ChooseInstructor(long studentId, long instructorId);

		Task<UserResponseDto> PassTheoryStudent(long id);

		Task<List<UserResponseDto>> GetAvailableExaminers(DateTime startTime, DateTime endTime);

		Task UpdateNumberOfClasses(long id, bool increment);

		Task UpdateNumberOfExams(long id, bool increment);
	}
}
