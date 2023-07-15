using DrivingApp.Common.Enum;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrivingApp.Model
{
	public class DrivingClass
	{
		[Key]
		public long Id { get; set; }

		[Required]
		public ClassType ClassType { get; set; }

		[Required]
		public bool IsConfirmed { get; set; }

		[Required]
		public DateTime StartTime { get; set; }

		[Required]
		public DateTime EndTime { get; set; }

		public long InstructorId { get; set; }

		[ForeignKey("InstructorId")]
		public Instructor Instructor { get; set; }


		public long StudentId { get; set; }
		
		[ForeignKey("StudentId")]
		public Student Student { get; set; }
	}
}
