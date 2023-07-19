using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DrivingApp.Common.Exceptions;
using DrivingApp.Dto;
using DrivingApp.Interface.Repositories;
using DrivingApp.Interface.Services;
using DrivingApp.Model;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace DrivingApp.Services
{
	public class AppointmentService : IAppointmentService
	{
		private readonly IAppointmentRepository _appointmentRepo;
		private readonly IUserService _userService;
		private readonly IMapper _mapper;

		public AppointmentService(IAppointmentRepository appointmentRepo, IUserService userService, IMapper mapper)
		{
			_appointmentRepo = appointmentRepo;
			_userService = userService;
			_mapper = mapper;
		}

		public async Task<AppointmentDto> AddAsync(AppointmentDto appointmentDto)
		{
			var appointment = _mapper.Map<Appointment>(appointmentDto);

			if (appointment == null) throw new InvalidOperationException();
			if (!appointment.IsExam && await _appointmentRepo.CheckTimeAsync(appointmentDto))
			{
				throw new MyException("There is already an appointment made for this time! Please choose different time.");
			}

			if (appointment.IsExam && await _appointmentRepo.CheckExamConditionsAsync(appointmentDto))
			{
				throw new MyException("There is already an appointment made for this time! Please choose different time.");
			}

			var appointmentAdded = await _appointmentRepo.AddAsync(appointment);

			if (appointmentAdded == null) throw new InvalidOperationException();

			return _mapper.Map<AppointmentDto>(appointmentAdded);
		}

		public async Task<AppointmentDto> GetAsync(long id)
		{
			var appointment = await _appointmentRepo.GetAsync(id);

			if (appointment == null) throw new ArgumentNullException($"Class doesn't exists");

			return _mapper.Map<AppointmentDto>(appointment);
		}

		public async Task<List<AppointmentDto>> GetByUserIdAsync(long userId, short role)
		{
			var classes = await _appointmentRepo.GetByUserIdAsync(userId, role);
			return _mapper.Map<List<AppointmentDto>>(classes);
		}

		public async Task<AppointmentDto> ConfirmEvent(long id)
		{
			var appointment = await _appointmentRepo.GetAsync(id);

			if (appointment.StartTime < DateTime.UtcNow)
			{
				throw new MyException("You can't confirm appointment from the past!");
			}

			var student = await _userService.GetAsync(appointment.StudentId);
			var client = new SendGridClient("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");
			var templateId = "";

			if (!appointment.IsExam)
			{
				templateId = "d-7088fb4024a04e3f93b22b0af148832a";
				await _userService.UpdateNumberOfClasses(appointment.StudentId, false);
			}
			else
			{
				templateId = "d-f2f938b475e045eabe728496c259f89b";
				await _userService.UpdateNumberOfExams(appointment.StudentId, true);
			}

			var appointmentUpdated = await _appointmentRepo.ConfirmEvent(appointment);

			var sendGridMessageStudent = GetSendGridMessage(templateId, appointment.IsConfirmed, appointment.StartTime, student.Name, student.Email);
			await client.SendEmailAsync(sendGridMessageStudent);

			return _mapper.Map<AppointmentDto>(appointmentUpdated);
		}

		public async Task RemoveEvent(long id)
		{
			var appointment = await _appointmentRepo.GetAsync(id);

			if (appointment.StartTime < DateTime.UtcNow)
			{
				throw new MyException("You can't remove appointment from the past!");
			}

			var student = await _userService.GetAsync(appointment.StudentId);
			var client = new SendGridClient("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");

			if (!appointment.IsExam)
			{
				var templateId = "d-7088fb4024a04e3f93b22b0af148832a";
				var sendGridMessageStudent = GetSendGridMessage(templateId, false, appointment.StartTime, student.Name, student.Email);
				await client.SendEmailAsync(sendGridMessageStudent);

				if (appointment.IsConfirmed && appointment.InstructorId.HasValue)
				{
					var instructor = await _userService.GetAsync(appointment.InstructorId.Value);
					var sendGridMessageInstructor = GetSendGridMessage(templateId, false, appointment.StartTime, instructor.Name, instructor.Email);
					await client.SendEmailAsync(sendGridMessageInstructor);

					await _userService.UpdateNumberOfClasses(appointment.StudentId, increment: true);
				}
			}
			else if (appointment.IsConfirmed && appointment.ExaminerId.HasValue)
			{
				var templateId = "d-f2f938b475e045eabe728496c259f89b";
				var sendGridMessageStudent = GetSendGridMessage(templateId, false, appointment.StartTime, student.Name, student.Email);
				await client.SendEmailAsync(sendGridMessageStudent);

				if (appointment.IsConfirmed && appointment.ExaminerId.HasValue)
				{
					var examiner = await _userService.GetAsync(appointment.ExaminerId.Value);
					var sendGridMessageInstructor = GetSendGridMessage(templateId, false, appointment.StartTime, examiner.Name, examiner.Email);
					await client.SendEmailAsync(sendGridMessageInstructor);

					await _userService.UpdateNumberOfExams(appointment.StudentId, increment: false);
				}
			}

			await _appointmentRepo.RemoveEvent(appointment);
		}

		public async Task<AppointmentDto> UpdateExamResults(long id, bool hasPassed)
		{
			var appointment = await _appointmentRepo.GetAsync(id);

			var student = await _userService.GetAsync(appointment.StudentId);
			var client = new SendGridClient("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");
			
			var sendGridMessageInstructor = GetSendGridMessageForExamResult(hasPassed, student.Name, student.Email);
			await client.SendEmailAsync(sendGridMessageInstructor);

			var appointmentUpdated = await _appointmentRepo.UpdateExamResults(appointment, hasPassed);

			return _mapper.Map<AppointmentDto>(appointmentUpdated);
		}

		private SendGridMessage GetSendGridMessage(string templateId, bool isConfirmed, DateTime time, string name, string email)
		{

			var subject = isConfirmed ? "Appointment approved" : "Appointment canceled";

			SendGridMessage sendGridMessage = new SendGridMessage()
			{
				Subject = isConfirmed ? "Appointment approved" : "Appointment removed",
				From = new EmailAddress("tamara.jancic@hotmail.com", "Tamara"),
				ReplyTo = new EmailAddress("tamara.jancic@hotmail.com"),
				TemplateId = templateId,

				Personalizations = new List<Personalization>()
				{
					new Personalization()
					{
						Tos = new List<EmailAddress>()
						{
							new EmailAddress(email)
						},
						TemplateData = new Dictionary<string, string>
						{
							{ "name", name },
							{ "isConfirmed", isConfirmed.ToString().ToLower() },
							{ "classTime", time.ToString("dd-MM-yyyy, HH:mm") },
							{ "subject", subject },
						}
					}
				}
			};

			return sendGridMessage;
		}

		private SendGridMessage GetSendGridMessageForExamResult(bool hasPassed,string name, string email)
		{

			var subject = "Exam";

			SendGridMessage sendGridMessage = new SendGridMessage()
			{
				From = new EmailAddress("tamara.jancic@hotmail.com", "Tamara"),
				ReplyTo = new EmailAddress("tamara.jancic@hotmail.com"),
				TemplateId = "d-8852eb6aee854c21ba97bb2ce4a260a3",

				Personalizations = new List<Personalization>()
				{
					new Personalization()
					{
						Tos = new List<EmailAddress>()
						{
							new EmailAddress(email)
						},
						TemplateData = new Dictionary<string, string>
						{
							{ "name", name },
							{ "hasPassed", hasPassed.ToString().ToLower() },
							{ "subject", subject },
						}
					}
				}
			};

			return sendGridMessage;
		}
	}
}
