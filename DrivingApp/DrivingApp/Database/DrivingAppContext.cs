namespace DrivingApp.Database
{
using System.Reflection.Metadata;
	using DrivingApp.Model;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.Extensions.Configuration;

	public class DrivingAppContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Admin> Admins { get; set; }
		public DbSet<Student> Students { get; set; }
		public DbSet<Instructor> Instructors { get; set; }
		public DbSet<Examiner> Examiners { get; set; }
		public DbSet<School> Schools { get; set; }
		public DbSet<DrivingClass> DrivingClasses { get; set; }
		public DbSet<Exam> Exams { get; set; }

		protected readonly IConfiguration Configuration;

		public DrivingAppContext(DbContextOptions<DrivingAppContext> options) : base(options) { }

		protected override void OnConfiguring(DbContextOptionsBuilder options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<DrivingClass>()
				.HasOne(s => s.School)
				.WithMany()
				.OnDelete(DeleteBehavior.ClientCascade);

			modelBuilder.Entity<DrivingClass>()
				.HasOne(s => s.Strudent)
				.WithMany()
				.OnDelete(DeleteBehavior.ClientCascade);

			modelBuilder.Entity<Exam>()
				.HasOne(s => s.Student)
				.WithMany()
				.OnDelete(DeleteBehavior.ClientCascade);

			modelBuilder.Entity<Exam>()
				.HasOne(e => e.Examiner)
				.WithMany()
				.OnDelete(DeleteBehavior.ClientCascade);

			/*modelBuilder.Entity<Admin>().HasData(new Admin { Id = 1,
				Name = "Admin",
				LastName = "Admin",
				Email = "admin",
				Role = Common.Enum.Role.Admin,
				IsVerified = true,
				PasswordHash = 0x16F53C2345D4937E8C16F0BCC9CF5EB0DB47FF88A163DD9E9C275DC55F9C98FFD46426172ADFFE42A3ECF971019F9E67074784B82A005CBE5836D614B6CCE76A,
				PasswordSalt = 0x332A2FA1E00D124CBD3628612F4DA032F8419C7D8B2D8B81B625B49E861181E10518A1AABACEDB9BF951E55E6C9B6FE86413FB9496A52CBE34C92EA8C606191B0BB4964066ABAD51A7BDBAD74D078ACBFF8DF9A42245D97B48589DD232FBDFC186E7C6A6EA0613A933C18F0A67B986715293F05B2627A747666E756B82B69080 });
*/
		}
	}
}
