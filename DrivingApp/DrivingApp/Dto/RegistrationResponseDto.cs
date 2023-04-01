using DrivingApp.Common.Enum;

namespace DrivingApp.Dto
{
	public class RegistrationResponseDto
	{
		public string Email { get; set; }
		public string Token { get; set; }
		public long Id { get; set; }
		public Role Role { get; set; }
	}
}
