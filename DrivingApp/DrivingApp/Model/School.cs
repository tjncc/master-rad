using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DrivingApp.Model
{
	public class School
	{
		[Key]
		public long Id { get; set; }

		[Required, MaxLength(100)]
		public string Name { get; set; }

		public int Year { get; set; }

		public ICollection<Instructor> Instructors { get; set; } = new List<Instructor>();

		public ICollection<Student> Students { get; set; } = new List<Student>();
	}
}
