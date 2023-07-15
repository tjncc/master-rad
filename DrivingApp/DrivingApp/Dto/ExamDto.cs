using System;

namespace DrivingApp.Dto
{
	public class ExamDto
	{
		public long Id { get; set; }

		public bool PassedPolygon { get; set; }

		public bool PassedDriving { get; set; }

		public DateTime StartTime { get; set; }

		public DateTime EndTime { get; set; }

		public long ExaminerId { get; set; }

		public long StudentId { get; set; }
	}
}
