using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Model;

namespace DrivingApp.Mapper
{
	public class UserProfile : Profile
	{

		public UserProfile()
		{
			CreateMap<Instructor, UserResponseDto>();
			CreateMap<Student, UserResponseDto>();
			CreateMap<Examiner, UserResponseDto>();
		}
	}
}
