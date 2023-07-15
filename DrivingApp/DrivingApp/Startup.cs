using System;
using System.Text;
using AutoMapper;
using DrivingApp.Common.Exceptions;
using DrivingApp.Database;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Mapper;
using DrivingApp.Repositories;
using DrivingApp.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace DrivingApp
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers(options =>
			{
				options.Filters.Add<MyExceptionFilter>();
			});

			services.AddCors(options =>
			{
				options.AddPolicy(
					name: "CorsPolicy",
					builder => builder.SetIsOriginAllowed(origin => true)
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials());
			});

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "DrivingApp", Version = "v1" });
			});

			services.AddHttpClient();

			var key = Encoding.UTF8.GetBytes("super secret unguessable key");

			services.AddAuthentication(x =>
			{
				x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(x =>
			{
				x.RequireHttpsMetadata = false;
				x.SaveToken = false;
				x.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuer = false,
					ValidateAudience = false,
					ClockSkew = TimeSpan.Zero
				};
			});

			/*			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
							.AddJwtBearer(options =>
							{
								options.TokenValidationParameters = new TokenValidationParameters
								{
									ValidateIssuer = true,
									ValidateAudience = true,
									ValidateLifetime = true,
									ValidateIssuerSigningKey = true,
									IssuerSigningKey = new SymmetricSecurityKey(key),
									ValidAudience = "https://localhost:44354"
								};
							});*/

			var mapperConfig = new MapperConfiguration(mc =>
			{
				mc.AddProfile(new StudentProfile());
				mc.AddProfile(new SchoolProfile());
				mc.AddProfile(new UserProfile());
				mc.AddProfile(new DrivingClassProfile());
				mc.AddProfile(new ExamProfile());
			});

			IMapper mapper = mapperConfig.CreateMapper();
			services.AddSingleton(mapper);

			services.AddDbContext<DrivingAppContext>(options =>
				   options.UseSqlServer(ConfigurationExtensions.GetConnectionString(Configuration, "DrivingAppDatabase")));

			//repos
			services.AddTransient<IAuthRepository, AuthRepository>();
			services.AddTransient<IUserRepository, UserRepository>();
			services.AddTransient<ISchoolRepository, SchoolRepository>();
			services.AddTransient<IDrivingClassRepository, DrivingClassRepository>();
			services.AddTransient<IExamRepository, ExamRepository>();

			//services
			services.AddTransient<IAuthService, AuthService>();
			services.AddTransient<ITokenService, TokenService>();
			services.AddTransient<ISchoolService, SchoolService>();
			services.AddTransient<IUserService, UserService>();
			services.AddTransient<IDrivingClassService, DrivingClassService>();
			services.AddTransient<IExamService, ExamService>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "DrivingApp v1"));
			}

			app.UseCors("CorsPolicy");

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
