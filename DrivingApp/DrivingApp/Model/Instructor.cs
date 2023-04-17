using DrivingApp.Common.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace DrivingApp.Model
{
	public class Instructor : User
	{
		[Required, MaxLength(15)]
		public long PhoneNumber { get; set; }

		[Required]
		public DateTime DateOfBirth { get; set; }

		[Required, MaxLength(13)]
		public long Jmbg { get; set; }

		[Required]
		public Category Category { get; set; }

		public long SchoolId { get; set; }
	}
}
