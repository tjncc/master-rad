using DrivingApp.Dto;
using DrivingApp.Model;
using Microsoft.AspNetCore.JsonPatch;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Repositories
{
	public interface ISchoolRepository
	{
		Task<School> GetAsync(long id);

		Task<List<School>> GetAllAsync();

		Task<School> AddAsync(School school);

		Task<School> UpdateAsync(long id, SchoolUpdateDto schoolUpdate);

		Task DeleteAync(long id);
	}
}
