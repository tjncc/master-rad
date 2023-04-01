using DrivingApp.Model;

namespace DrivingApp.Interface.Services
{
	public interface ITokenService
	{
		string CreateToken(User user);
		string CreateTokenUser(User user);
	}
}
