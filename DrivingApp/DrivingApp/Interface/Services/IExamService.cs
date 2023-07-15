using DrivingApp.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface IExamService
	{
		Task<ExamDto> GetAsync(long id);

		Task<List<ExamDto>> GetByUserIdAsync(long userId);

		Task<ExamDto> AddAsync(ExamDto examDto);
	}
}
