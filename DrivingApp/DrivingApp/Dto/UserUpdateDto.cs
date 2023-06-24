using DrivingApp.Common.Enum;

namespace DrivingApp.Dto
{
	public class UserUpdateDto
	{
		public Role Role { get; set; }

		public string Email { get; set; }

		public long PhoneNumber { get; set; }

	}
}
