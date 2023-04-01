using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Model;
using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Services
{
	public class SchoolService : ISchoolService
	{
		private readonly ISchoolRepository _schoolRepo;
		private readonly IMapper _mapper;

		public SchoolService(ISchoolRepository schoolRepo, IMapper mapper)
		{
			_schoolRepo = schoolRepo;
			_mapper = mapper;
		}

		public async Task<SchoolDto> GetAsync(long id)
		{
			var school = await _schoolRepo.GetAsync(id);
			
			if (school == null) throw new ArgumentNullException($"School with id {id} doesn't exists");
			
			return _mapper.Map<SchoolDto>(school);
		}

		public async Task<List<SchoolDto>> GetAllAsync()
		{
			var schools = await _schoolRepo.GetAllAsync();
			return _mapper.Map<List<SchoolDto>>(schools);
		}

		public async Task<SchoolDto> AddAsync(SchoolDto schoolDto)
		{
			School school = _mapper.Map<School>(schoolDto);
			School schoolAdded = await _schoolRepo.AddAsync(school);

			if (schoolAdded == null) throw new InvalidOperationException();

			return _mapper.Map<SchoolDto>(schoolAdded);
		}

		public async Task<SchoolDto> UpdateAsync(long id, JsonPatchDocument<School> schoolPatch)
		{
			School updatedSchool = await _schoolRepo.UpdateAsync(id, schoolPatch);
			
			if (updatedSchool == null) throw new InvalidOperationException();

			return _mapper.Map<SchoolDto>(updatedSchool.Id);
		}

		public async Task DeleteAsync(long id)
		{
			await _schoolRepo.DeleteAync(id);
		}
	}
}
