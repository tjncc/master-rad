using DrivingApp.Common.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace DrivingApp.Model
{
	public class Student : User
	{
		[Required, MaxLength(15)]
		public long PhoneNumber { get; set; }

		[Required]
		public DateTime DateOfBirth { get; set; }

		[Required, MaxLength(13)]
		public long Jmbg { get; set; }

		[Required]
		public Category Category { get; set; }

		[Required]
		public uint NumberOfClasses { get; set; }

		[Required]
		public uint NumberOfExams { get; set; }

		[Required]
		public bool PassedTheory { get; set; }


		public long? SchoolId { get; set; }

		public long? InstructorId { get; set; }
	}
}
