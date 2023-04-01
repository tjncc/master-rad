using DrivingApp.Model;
using System.Threading.Tasks;

namespace DrivingApp.Interface.Services
{
	public interface IUserService
	{
		Task<User> GetAsync(long userId);

		Task<bool> VerifyAsync(long userId);
	}
}
