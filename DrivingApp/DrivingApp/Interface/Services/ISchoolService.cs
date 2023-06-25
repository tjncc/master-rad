using DrivingApp.Dto;
using DrivingApp.Model;
using Microsoft.AspNetCore.JsonPatch;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface ISchoolService
	{
		Task<SchoolDto> GetAsync(long id);

		Task<List<SchoolDto>> GetAllAsync();

		Task<SchoolDto> AddAsync(SchoolDto schoolDto);

		Task<SchoolDto> UpdateAsync(long id, SchoolUpdateDto schoolUpdate);

		Task DeleteAsync(long id);
	}
}
