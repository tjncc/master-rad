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
	public class ExamController : Controller
	{
		private readonly IExamService _examService;

		public ExamController(IExamService examService)
		{
			_examService = examService;
		}

		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<ExamDto>> GetExam(long id)
		{
			ExamDto exam = await _examService.GetAsync(id);
			return Ok(exam);
		}

		[HttpPost()]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<ExamDto>> PostDrivingClass([FromBody] ExamDto examDto)
		{
			ExamDto exam = await _examService.AddAsync(examDto);
			return Ok(exam);
		}

		[HttpGet("user/{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<List<ExamDto>>> GetExamsByUserId(long id)
		{
			List<ExamDto> exams = await _examService.GetByUserIdAsync(id);
			return Ok(exams);
		}
	}
}
