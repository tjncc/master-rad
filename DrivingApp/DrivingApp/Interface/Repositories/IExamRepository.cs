using DrivingApp.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Repositories
{
	public interface IExamRepository
	{
		Task<Exam> GetAsync(long id);

		Task<List<Exam>> GetByUserIdAsync(long userId);

		Task<Exam> AddAsync(Exam exam);
	}
}
