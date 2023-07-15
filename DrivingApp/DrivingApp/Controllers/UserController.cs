using DrivingApp.Dto;
using System.Threading.Tasks;
using DrivingApp.Interface.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DrivingApp.Model;
using Microsoft.AspNetCore.JsonPatch;

namespace DrivingApp.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : Controller
	{
		private readonly IUserService _userService;

		public UserController(IUserService userService)
		{
			_userService = userService;
		}

		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<UserResponseDto>> GetUser(long id)
		{
			var user = await _userService.GetAsync(id);
			return Ok(user);
		}

		[HttpPost("verify/{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<bool>> VerifyUser(long id)
		{
			var isVerified = await _userService.VerifyAsync(id);
			return Ok(isVerified);
		}

		[HttpGet("instructors/school/{schoolId}/{categoryId}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<List<UserResponseDto>>> GetInstructorsBySchool(long schoolId, short categoryId)
		{
			var instructors = await _userService.GetInstructorsBySchool(schoolId, categoryId);
			return Ok(instructors);
		}

		[HttpGet("all")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<List<UserResponseDto>>> GetAllUsers()
		{
			var users = await _userService.GetAllUsersAsync();
			return Ok(users);
		}

		[HttpDelete("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public ActionResult DeleteUser(long id)
		{
			_userService.Delete(id);
			return Ok();
		}

		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<UserResponseDto>> UpdateUser(long id, [FromBody] UserUpdateDto updateUser)
		{
			var user = await _userService.Update(id, updateUser);
			return Ok(user);
		}

		[HttpPut("{studentId}/{instructorId}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<UserResponseDto>> ChooseInstructor(long studentId, long instructorId)
		{
			var user = await _userService.ChooseInstructor(studentId, instructorId);
			return Ok(user);
		}
	}
}
