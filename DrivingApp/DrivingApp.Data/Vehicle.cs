using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrivingApp.Data
{
	internal class Vehicle
	{
		public int Id { get; set; }

		[Required]
		public string Type { get; set; }
		public string Model { get; set; }
		public int Year { get; set; }
	}
}
