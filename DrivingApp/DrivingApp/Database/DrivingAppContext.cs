namespace DrivingApp.Database
{
	using System.Collections.Generic;
	using System.Reflection.Metadata;
using DrivingApp.Common.Struct;
	using DrivingApp.Model;
	using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
	using Microsoft.Extensions.Configuration;
	using Newtonsoft.Json;

	public class DrivingAppContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Admin> Admins { get; set; }
		public DbSet<Student> Students { get; set; }
		public DbSet<Instructor> Instructors { get; set; }
		public DbSet<Examiner> Examiners { get; set; }
		public DbSet<School> Schools { get; set; }
		public DbSet<Appointment> Appointments { get; set; }
		public DbSet<Route> Routes { get; set; }

		protected readonly IConfiguration Configuration;

		public DrivingAppContext(DbContextOptions<DrivingAppContext> options) : base(options) { }

		protected override void OnConfiguring(DbContextOptionsBuilder options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Appointment>()
				.HasOne(s => s.Student)
				.WithMany()
				.OnDelete(DeleteBehavior.ClientCascade);

			modelBuilder.Entity<Appointment>()
				.HasOne(s => s.Instructor)
				.WithMany()
				.OnDelete(DeleteBehavior.ClientCascade);

			modelBuilder.Entity<Appointment>()
				.HasOne(s => s.Examiner)
				.WithMany()
				.OnDelete(DeleteBehavior.ClientCascade);

			modelBuilder.Entity<Route>()
				.Property(r => r.Coordinates)
				.HasConversion(
					coordsList => JsonConvert.SerializeObject(coordsList),
					json => JsonConvert.DeserializeObject<List<Coords>>(json))
				.Metadata.SetValueComparer(
					new ValueComparer<ICollection<Coords>>(
						(c1, c2) => JsonConvert.SerializeObject(c1) == JsonConvert.SerializeObject(c2),
						c => c.GetHashCode()));
		}
	}
}
