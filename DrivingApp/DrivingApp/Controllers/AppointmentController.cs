using DrivingApp.Dto;
using System.Threading.Tasks;
using DrivingApp.Interface.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace DrivingApp.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AppointmentController : Controller
	{
		private readonly IAppointmentService _appointmentService;

		public AppointmentController(IAppointmentService appointmentService)
		{
			_appointmentService = appointmentService;
		}

		[HttpGet("{id}")]
		[Authorize(Roles = "Student, Examiner, Instructor")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<AppointmentDto>> GetEvent(long id)
		{
			AppointmentDto appointment = await _appointmentService.GetAsync(id);
			return Ok(appointment);
		}

		[HttpPost()]
		[Authorize(Roles = "Student, Examiner")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<AppointmentDto>> PostEvent([FromBody] AppointmentDto appointmentDto)
		{
			AppointmentDto appointment = await _appointmentService.AddAsync(appointmentDto);
			return Ok(appointment);
		}

		[HttpGet("user/{id}/{role}")]
		[Authorize(Roles = "Student, Examiner, Instructor")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<List<AppointmentDto>>> GetEventsByUserId(long id, short role)
		{
			List<AppointmentDto> appointments = await _appointmentService.GetByUserIdAsync(id, role);
			return Ok(appointments);
		}

		[HttpPut("confirm/{id}")]
		[Authorize(Roles = "Student, Examiner, Instructor")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<AppointmentDto>> ConfirmEvent(long id)
		{
			AppointmentDto appointment = await _appointmentService.ConfirmEvent(id);
			return Ok(appointment);
		}

		[HttpDelete("remove/{id}")]
		[Authorize(Roles = "Student, Examiner, Instructor")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<AppointmentDto>> RemoveEvent(long id)
		{
			await _appointmentService.RemoveEvent(id);
			return Ok();
		}

		[HttpPut("exam-result/{id}/{hasPassed}")]
		[Authorize(Roles = "Examiner")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<AppointmentDto>> UpdateExamResult(long id, bool hasPassed)
		{
			await _appointmentService.UpdateExamResults(id, hasPassed);
			return Ok();
		}
	}
}
