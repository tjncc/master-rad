import axios from 'axios'
import config from '../helpers/config'
import authHeader from '../helpers/authHeader';

export const addAppointment = (data) => axios.post(`${config.baseUrl}/api/Appointment`, data, { headers: authHeader() })

export const getAppointmentsByUser = (id, role) => axios.get(`${config.baseUrl}/api/Appointment/user/${id}/${role}`, { headers: authHeader() })

export const confirmEvent = (id) => axios.put(`${config.baseUrl}/api/Appointment/confirm/${id}`, { headers: authHeader() })

export const removeEvent = (id) => axios.delete(`${config.baseUrl}/api/Appointment/remove/${id}`, { headers: authHeader() })

export const updateExamResult = (id, hasPassed) => axios.put(`${config.baseUrl}/api/Appointment/exam-result/${id}/${hasPassed}`, { headers: authHeader() })