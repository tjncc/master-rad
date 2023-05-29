using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Model;
using DrivingApp.Repositories;

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

		public Task<User> GetAsync(long userId)
		{
			throw new System.NotImplementedException();
		}

		public async Task<bool> VerifyAsync(long userId)
		{
			return await _userRepository.VerifyAsync(userId);
		}

		public async Task<List<UserResponseDto>> GetInstructorsBySchool(long schoolId)
		{
			var instructors = await _userRepository.GetInstructorsBySchool(schoolId);
			return _mapper.Map<List<UserResponseDto>>(instructors);
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
	}
}
