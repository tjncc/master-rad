using DrivingApp.Common.Enum;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrivingApp.Model
{
	public class Appointment
	{
		[Key]
		public long Id { get; set; }

		public bool IsExam { get; set; }

		public ExamStatus? ExamStatus { get; set; }

		public ClassType? ClassType { get; set; }

		[Required]
		public bool IsConfirmed { get; set; }

		[Required]
		public DateTime StartTime { get; set; }

		[Required]
		public DateTime EndTime { get; set; }

		public long StudentId { get; set; }

		[ForeignKey("StudentId")]
		public Student Student { get; set; }

		public long? InstructorId { get; set; }

		[ForeignKey("InstructorId")]
		public Instructor? Instructor { get; set; }

		public long? ExaminerId { get; set; }

		[ForeignKey("ExaminerId")]
		public Examiner? Examiner { get; set; }
	}
}
