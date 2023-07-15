using System;
using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Model;

namespace DrivingApp.Mapper
{
	public class DrivingClassProfile : Profile
	{
		public DrivingClassProfile()
		{
			CreateMap<DrivingClass, DrivingClassDto>()
					.ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.Name + " " + src.Student.LastName))
					.ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.Name + " " + src.Instructor.LastName))
					.ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => ConvertUtcToGmtPlus2(src.StartTime)))
					.ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => ConvertUtcToGmtPlus2(src.EndTime)));

			CreateMap<DrivingClassDto, DrivingClass>();
		}

		private DateTime ConvertUtcToGmtPlus2(DateTime utcDateTime)
		{
			TimeZoneInfo gmtPlus2TimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");
			return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, gmtPlus2TimeZone);
		}
	}
}
