using DrivingApp.Model;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Repositories
{
	public interface IUserRepository
	{
		Task<User> GetAsync(long userId);

		Task<bool> VerifyAsync(long id);
	}
}
