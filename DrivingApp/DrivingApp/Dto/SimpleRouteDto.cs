using DrivingApp.Common.Struct;
using System.Collections.Generic;
using System;

namespace DrivingApp.Dto
{
	public class SimpleRouteDto
	{
		public long? Id { get; set; }

		public long StudentId { get; set; }

		public long InstructorId { get; set; }

		public DateTime StartTime { get; set; }

		public DateTime EndTime { get; set; }
	}
}
