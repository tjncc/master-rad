using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Model;

namespace DrivingApp.Mapper
{
	public class StudentProfile : Profile
	{
		public StudentProfile()
		{
			CreateMap<RegistrationRequestDto, Student>();
		}
	}
}
