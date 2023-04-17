using System;
using AutoMapper;
using DrivingApp.Common.Enum;
using DrivingApp.Dto;
using DrivingApp.Model;

namespace DrivingApp.Mapper
{
	public class InstructorProfile : Profile
	{
		public InstructorProfile()
		{
			CreateMap<Instructor, InstructorResponseDto>();
		}
	}
}
