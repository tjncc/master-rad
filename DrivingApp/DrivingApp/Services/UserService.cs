using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DrivingApp.Common.Enum;
using DrivingApp.Common.Exceptions;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Model;

namespace DrivingApp.Services
{
	public class UserService : IUserService
	{
		private readonly IUserRepository _userRepository;
		private readonly IMapper _mapper;

		public UserService(IUserRepository userRepository, IMapper mapper)
{
			_userRepository = userRepository;
			_mapper = mapper;
		}

		public async Task<UserResponseDto> GetAsync(long userId)
		{
			var user = await _userRepository.GetAsync(userId);
			return _mapper.Map<UserResponseDto>(user);
		}

		public async Task<bool> VerifyAsync(long userId)
		{
			return await _userRepository.VerifyAsync(userId);
		}

		public async Task<List<UserResponseDto>> GetInstructorsBySchool(long schoolId, short categoryId)
		{
			var instructors = await _userRepository.GetInstructorsBySchool(schoolId, categoryId);
			return _mapper.Map<List<UserResponseDto>>(instructors);
		}

		public async Task<List<UserResponseDto>> GetStudentsForExam(long schoolId)
		{
			var students = await _userRepository.GetStudentsForExam(schoolId);
			return _mapper.Map<List<UserResponseDto>>(students);
		}
		public async Task<List<UserResponseDto>> GetAllUsersAsync()
		{
			var users = await _userRepository.GetAllUsersAsync();
			return _mapper.Map<List<UserResponseDto>>(users);
		}

		public void Delete(long id)
		{
			_userRepository.Delete(id);
		}

		public async Task<UserResponseDto> Update(long userId, UserUpdateDto updateUser)
		{
			var user = await _userRepository.Update(userId, updateUser);
			if (user == null)
			{
				throw new MyException("User update unsuccessful");
			}

			return _mapper.Map<UserResponseDto>(user);
		}

		public async Task<UserResponseDto> ChooseInstructor(long studentId, long instructorId)
		{
			var student = await _userRepository.ChooseInstructor(studentId, instructorId);
			return _mapper.Map<UserResponseDto>(student);
		}

		public async Task<UserResponseDto> PassTheoryStudent(long id)
		{
			var student = await _userRepository.PassTheoryStudent(id);
			return _mapper.Map<UserResponseDto>(student);
		}

		public async Task<List<UserResponseDto>> GetAvailableExaminers(DateTime startTime, DateTime endTime)
		{
			var examiners = await _userRepository.GetAvailableExaminers(startTime, endTime);
			return _mapper.Map<List<UserResponseDto>>(examiners);
		}

		public async Task UpdateNumberOfClasses(long id, bool increment)
		{
			await _userRepository.UpdateNumberOfClasses(id, increment);
		}

		public async Task UpdateNumberOfExams(long id, bool increment)
		{
			await _userRepository.UpdateNumberOfExams(id, increment);
		}

		public async Task<List<UserResponseDto>> GetStudentsByInstructor(long instructorId)
		{
			var students = await _userRepository.GetStudentsByInstructor(instructorId);
			return _mapper.Map<List<UserResponseDto>>(students);
		}
	}
}
