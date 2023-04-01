using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrivingApp.Model
{
	public class Exam
	{
		[Key]
		public long Id { get; set; }

		[Required]
		public bool PassedPolygon { get; set; }

		[Required]
		public bool PassedDriving { get; set; }


		public long ExaminerId { get; set; }

		[ForeignKey("ExaminerId")]
		public Examiner Examiner { get; set; }


		public long StudentId { get; set; }

		[ForeignKey("StudentId")]
		public Student Student { get; set; }
	}
}
