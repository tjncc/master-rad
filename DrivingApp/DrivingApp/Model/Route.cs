using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DrivingApp.Common.Struct;

namespace DrivingApp.Model
{
	public class Route
	{
		[Key]
		public long Id { get; set; }

		[Required]
		public ICollection<Coords> Coordinates { get; set; }

		[Required]
		public DateTime StartTime { get; set; }

		[Required]
		public DateTime EndTime { get; set; }

		public long StudentId { get; set; }

		public long InstructorId { get; set; }
	}
}
