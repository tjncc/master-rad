using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DrivingApp.Services
{
	public class AuthService : IAuthService
	{
        private readonly IAuthRepository _authenticationRepository;
        public AuthService(IAuthRepository authenticationRepository)
        {
            _authenticationRepository = authenticationRepository ?? throw new ArgumentNullException(nameof(authenticationRepository));
        }
        public Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto loginRequest)
        {
            return _authenticationRepository.Login(loginRequest);
        }

        public Task<ActionResult<RegistrationResponseDto>> Register(RegistrationRequestDto registrationRequest)
        {
            return _authenticationRepository.Register(registrationRequest);
        }

        public async Task<User> VerifyEmail(long userId)
        {
            return await _authenticationRepository.VerifyEmail(userId);
        }
    }
}
