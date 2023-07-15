using DrivingApp.Dto;
using System.Threading.Tasks;
using DrivingApp.Interface.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DrivingApp.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DrivingClassController : Controller
	{
		private readonly IDrivingClassService _classService;

		public DrivingClassController(IDrivingClassService classService)
		{
			_classService = classService;
		}

		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<DrivingClassDto>> GetDrivingClass(long id)
		{
			DrivingClassDto drivingClass = await _classService.GetAsync(id);
			return Ok(drivingClass);
		}

		[HttpPost()]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<DrivingClassDto>> PostDrivingClass([FromBody] DrivingClassDto drivingClassDto)
		{
			DrivingClassDto drivingClass = await _classService.AddAsync(drivingClassDto);
			return Ok(drivingClass);
		}

		[HttpGet("user/{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<List<DrivingClassDto>>> GetClassesByUserId(long id)
		{
			List<DrivingClassDto> drivingClasses = await _classService.GetByUserIdAsync(id);
			return Ok(drivingClasses);
		}
	}
}
