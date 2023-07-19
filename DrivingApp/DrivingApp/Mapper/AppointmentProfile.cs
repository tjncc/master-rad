using System;
using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Model;

namespace DrivingApp.Mapper
{
	public class AppointmentProfile : Profile
	{
		public AppointmentProfile()
		{
			CreateMap<Appointment, AppointmentDto>()
					.ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.Name + " " + src.Student.LastName))
					.ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.Name + " " + src.Instructor.LastName))
					.ForMember(dest => dest.ExaminerName, opt => opt.MapFrom(src => src.Examiner.Name + " " + src.Examiner.LastName))
					.ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => ConvertUtcToGmtPlus2(src.StartTime)))
					.ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => ConvertUtcToGmtPlus2(src.EndTime)));

			CreateMap<AppointmentDto, Appointment>();
		}

		private DateTime ConvertUtcToGmtPlus2(DateTime utcDateTime)
		{
			TimeZoneInfo gmtPlus2TimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");
			return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, gmtPlus2TimeZone);
		}
	}
}
