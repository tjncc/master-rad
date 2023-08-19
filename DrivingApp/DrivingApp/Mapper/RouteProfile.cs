using System;
using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Model;

namespace DrivingApp.Mapper
{
	public class RouteProfile : Profile
	{
		public RouteProfile()
		{
			CreateMap<Route, RouteDto>()
				.ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => ConvertUtcToGmtPlus2(src.StartTime)))
				.ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => ConvertUtcToGmtPlus2(src.EndTime)));

			CreateMap<RouteDto, Route>();
		}

		private DateTime ConvertUtcToGmtPlus2(DateTime utcDateTime)
		{
			TimeZoneInfo gmtPlus2TimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");
			return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, gmtPlus2TimeZone);
		}
	}
}
