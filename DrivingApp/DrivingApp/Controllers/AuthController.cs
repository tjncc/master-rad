using DrivingApp.Common.Enum;
using DrivingApp.Dto;
using DrivingApp.Interface.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DrivingApp.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : Controller
	{
		private readonly IAuthService _authService;

		public AuthController(IAuthService authService)
		{
			_authService = authService ?? throw new ArgumentNullException(nameof(authService));
		}

		[Authorize(Roles = "Student")]
		[HttpGet(template: "test")]
		public string Test() { return "test"; }

		[HttpPost("register")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<RegistrationResponseDto>> Register([FromBody] RegistrationRequestDto registrationRequest)
		{
			return await _authService.Register(registrationRequest);
		}

		[HttpPost("login")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto loginRequest)
		{
			return await _authService.Login(loginRequest);
		}
	}
}
