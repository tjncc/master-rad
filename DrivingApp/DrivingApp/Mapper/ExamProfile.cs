using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Model;

namespace DrivingApp.Mapper
{
	public class ExamProfile : Profile
	{
		public ExamProfile()
		{
			CreateMap<Exam, ExamDto>();
			CreateMap<ExamDto, Exam>();
		}
	}
}
