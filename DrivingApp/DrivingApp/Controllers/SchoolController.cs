using System.Collections.Generic;
using System.Threading.Tasks;
using DrivingApp.Dto;
using DrivingApp.Interface.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DrivingApp.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SchoolController : Controller
	{
		private readonly ISchoolService _schoolService;

		public SchoolController(ISchoolService schoolService)
		{
			_schoolService = schoolService;
		}

		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<SchoolDto>> GetSchool(long id)
		{
			SchoolDto school = await _schoolService.GetAsync(id);
			return Ok(school);
		}

		[HttpGet()]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<SchoolDto>> GetAllSchools()
		{
			List<SchoolDto> schools = await _schoolService.GetAllAsync();
			return Ok(schools);
		}

		[HttpPost()]
		[Authorize(Roles = "Admin")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<SchoolDto>> PostSchool([FromBody] SchoolDto schoolDto)
		{
			SchoolDto school = await _schoolService.AddAsync(schoolDto);
			return Ok(school);
		}

		[HttpPut("{id}")]
		[Authorize(Roles = "Admin")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<SchoolDto>> PatchSchool(long id, [FromBody] SchoolUpdateDto schoolUpdate)
		{
			SchoolDto school = await _schoolService.UpdateAsync(id, schoolUpdate);
			return Ok(school);
		}

		[HttpDelete("{id}")]
		[Authorize(Roles = "Admin")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<SchoolDto>> RemoveSchool(long id)
		{
			await _schoolService.DeleteAsync(id);
			return Ok();
		}
	}
}
