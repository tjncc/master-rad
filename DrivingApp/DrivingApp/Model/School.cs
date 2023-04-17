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

		public string Address { get; set; }

		public string City { get; set; }

		public string Description { get; set; }

		public long PhoneNumber { get; set; }

		public string Email { get; set; }

		public ICollection<Instructor> Instructors { get; set; } = new List<Instructor>();

		public ICollection<Student> Students { get; set; } = new List<Student>();
	}
}
