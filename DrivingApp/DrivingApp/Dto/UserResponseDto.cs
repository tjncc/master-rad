using System;
using DrivingApp.Common.Enum;

namespace DrivingApp.Dto
{
	public class UserResponseDto
	{
		public long? Id { get; set; }
		public string Name { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public Role Role { get; set; }
		public long PhoneNumber { get; set; }
		public DateTime DateOfBirth { get; set; }
		public long Jmbg { get; set; }
		public Category Category { get; set; }
		public long? SchoolId { get; set; }
	}
}
