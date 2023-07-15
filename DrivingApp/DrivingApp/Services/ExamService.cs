using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Model;

namespace DrivingApp.Services
{
	public class ExamService : IExamService
	{
		private readonly IExamRepository _examRepo;
		private readonly IMapper _mapper;

		public ExamService(IExamRepository examRepo, IMapper mapper)
		{
			_examRepo = examRepo;
			_mapper = mapper;
		}

		public async Task<ExamDto> AddAsync(ExamDto examDto)
		{
			var exam = _mapper.Map<Exam>(examDto);
			var examAdded = await _examRepo.AddAsync(exam);

			if (examAdded == null) throw new InvalidOperationException();

			return _mapper.Map<ExamDto>(examAdded);
		}

		public async Task<ExamDto> GetAsync(long id)
		{
			var exam = await _examRepo.GetAsync(id);

			if (exam == null) throw new ArgumentNullException($"Exam doesn't exists");

			return _mapper.Map<ExamDto>(exam);
		}

		public async Task<List<ExamDto>> GetByUserIdAsync(long userId)
		{
			var classes = await _examRepo.GetByUserIdAsync(userId);
			return _mapper.Map<List<ExamDto>>(classes);
		}
	}
}
