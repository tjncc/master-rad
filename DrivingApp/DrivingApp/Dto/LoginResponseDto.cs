using DrivingApp.Common.Enum;

namespace DrivingApp.Dto
{
	public class LoginResponseDto
	{
		public long Id { get; set; }

		public string Name { get; set; }

		public string LastName { get; set; }

		public string Email { get; set; }

		public string Role { get; set; }

		public string Token { get; set; }
	}
}
