using DrivingApp.Common.Enum;
using System;

namespace DrivingApp.Dto
{
	public class DrivingClassDto
	{
		public long? Id { get; set; }

		public ClassType ClassType { get; set; }

		public bool IsConfirmed { get; set; }

		public DateTime StartTime { get; set; }

		public DateTime EndTime { get; set; }

		public long InstructorId { get; set; }

		public long StudentId { get; set; }

		public string? StudentName { get; set; }

		public string? InstructorName { get; set; }
	}
}
