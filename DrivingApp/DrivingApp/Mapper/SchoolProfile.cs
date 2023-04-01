using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Model;

namespace DrivingApp.Mapper
{
	public class SchoolProfile : Profile
	{
		public SchoolProfile()
		{
			CreateMap<School, SchoolDto>();
			CreateMap<SchoolDto, School>();
		}
	}
}
