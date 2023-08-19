using DrivingApp.Common.Struct;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DrivingApp.Dto
{
	public class RouteDto
	{
		public long? Id { get; set; }

		public ICollection<Coords> Coordinates { get; set; }

		public long StudentId { get; set; }

		public long InstructorId { get; set; }

		public DateTime StartTime { get; set; }

		public DateTime EndTime { get; set; }
	}
}
