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
	public class RouteController : Controller
	{
		private readonly IRouteService _routeService;

		public RouteController(IRouteService routeService)
		{
			_routeService = routeService;
		}

		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<RouteDto>> GetRoute(long id)
		{
			RouteDto route = await _routeService.GetAsync(id);
			return Ok(route);
		}

		[HttpGet("student/{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<SimpleRouteDto>> GetRoutesByStudent(long id)
		{
			List<SimpleRouteDto> routes = await _routeService.GetByStudentIdAsync(id);
			return Ok(routes);
		}

		[HttpPost()]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<RouteDto>> PostRoute([FromBody] RouteDto routeDto)
		{
			RouteDto route = await _routeService.AddAsync(routeDto);
			return Ok(route);
		}

		[HttpDelete("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status401Unauthorized)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status406NotAcceptable)]
		public async Task<ActionResult<SchoolDto>> RemoveRoute(long id)
		{
			await _routeService.DeleteAsync(id);
			return Ok();
		}
	}
}
