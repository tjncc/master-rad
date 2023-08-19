using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Model;

namespace DrivingApp.Services
{
	public class RouteService : IRouteService
	{
		private readonly IRouteRepository _routeRepo;
		private readonly IMapper _mapper;

		public RouteService(IRouteRepository routeRepo, IMapper mapper)
		{
			_routeRepo = routeRepo;
			_mapper = mapper;
		}

		public async Task<RouteDto> GetAsync(long id)
		{
			var route = await _routeRepo.GetAsync(id);

			if (route == null) throw new ArgumentNullException($"Route with id {id} doesn't exists");

			return _mapper.Map<RouteDto>(route);
		}

		public async Task<List<RouteDto>> GetByStudentIdAsync(long studentId)
		{
			var routes = await _routeRepo.GetByStudentIdAsync(studentId);
			return _mapper.Map<List<RouteDto>>(routes);
		}

		public async Task<RouteDto> AddAsync(RouteDto routeDto)
		{
			Route route = _mapper.Map<Route>(routeDto);
			Route routeAdded = await _routeRepo.AddAsync(route);

			if (routeAdded == null) throw new InvalidOperationException();

			return _mapper.Map<RouteDto>(routeAdded);
		}

		public async Task DeleteAsync(long id)
		{
			await _routeRepo.DeleteAync(id);
		}
	}
}
