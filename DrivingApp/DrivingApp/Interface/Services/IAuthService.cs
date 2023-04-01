using DrivingApp.Dto;
using DrivingApp.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface IAuthService
	{
		Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto loginRequest);
		Task<ActionResult<RegistrationResponseDto>> Register(RegistrationRequestDto registrationRequest);
		Task<User> VerifyEmail(long userId);
	}
}
