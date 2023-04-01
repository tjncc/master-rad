using DrivingApp.Common.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace DrivingApp.Model
{
	public abstract class User
	{
		[Key]
		public long Id { get; set; }
		
		[Required, MaxLength(50)]
		public string Name { get; set; }

		[Required, MaxLength(50)]
		public string LastName { get; set; }

		[Required]
		public string Email { get; set; }

		[Required]
		public Role Role { get; set; }

		public byte[] PasswordHash { get; set; }

		public byte[] PasswordSalt { get; set; }

		public bool IsVerified { get; set; }

	}
}
