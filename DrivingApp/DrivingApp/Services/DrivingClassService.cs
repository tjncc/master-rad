using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DrivingApp.Common.Exceptions;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Model;

namespace DrivingApp.Services
{
	public class DrivingClassService : IDrivingClassService
	{
		private readonly IDrivingClassRepository _classRepo;
		private readonly IMapper _mapper;

		public DrivingClassService(IDrivingClassRepository classRepo, IMapper mapper)
		{
			_classRepo = classRepo;
			_mapper = mapper;
		}

		public async Task<DrivingClassDto> AddAsync(DrivingClassDto drivingClassDto)
		{
			var drivingClass = _mapper.Map<DrivingClass>(drivingClassDto);

			if (drivingClass == null) throw new InvalidOperationException();
			if (await _classRepo.CheckTimeAsync(drivingClassDto))
			{
				throw new MyException("There is already an appointment made for this time! Please choose different time.");
			}
			
			var drivingClassAdded = await _classRepo.AddAsync(drivingClass);

			if (drivingClassAdded == null) throw new InvalidOperationException();

			return _mapper.Map<DrivingClassDto>(drivingClassAdded);
		}

		public async Task<DrivingClassDto> GetAsync(long id)
		{
			var drivingClass = await _classRepo.GetAsync(id);

			if (drivingClass == null) throw new ArgumentNullException($"Class doesn't exists");

			return _mapper.Map<DrivingClassDto>(drivingClass);
		}

		public async Task<List<DrivingClassDto>> GetByUserIdAsync(long userId)
		{
			var classes = await _classRepo.GetByUserIdAsync(userId);
			return _mapper.Map<List<DrivingClassDto>>(classes);
		}
	}
}
