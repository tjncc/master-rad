﻿using DrivingApp.Dto;
using DrivingApp.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface IUserService
	{
		Task<User> GetAsync(long userId);

		Task<bool> VerifyAsync(long userId);

		Task<List<UserResponseDto>> GetInstructorsBySchool(long schoolId);

		Task<List<UserResponseDto>> GetAllUsersAsync();

		void Delete(long id);
	}
}
