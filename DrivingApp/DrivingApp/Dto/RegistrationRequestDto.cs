using DrivingApp.Common.Enum;
using System;

namespace DrivingApp.Dto
{
	public class RegistrationRequestDto
	{
		public string Name { get; set; }

		public string LastName { get; set; }

		public string Email { get; set; }

		public Role Role { get; set; }

		public string Password { get; set; }

		public long? PhoneNumber { get; set; }

		public DateTime? DateOfBirth { get; set; }

		public long? Jmbg { get; set; }

		public Category? Category { get; set; }

		public long? SchoolId { get; set; }
	}
}
