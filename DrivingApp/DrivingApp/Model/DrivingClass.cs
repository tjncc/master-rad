using DrivingApp.Common.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrivingApp.Model
{
	public class DrivingClass
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public ClassType ClassType { get; set; }

		[Required]
		public bool IsConfirmed { get; set; }


		public long InstructorId { get; set; }

		[ForeignKey("InstructorId")]
		public Instructor Instructor { get; set; }


		public long StudentId { get; set; }
		
		[ForeignKey("StudentId")]
		public Student Strudent { get; set; }


		public long SchoolId { get; set; }

		[ForeignKey("SchoolId")]
		public School School { get; set; }
	}
}
