import axios from 'axios'
import config from '../config'
import authHeader from '../helpers/authHeader';

export const register = (data) => axios.post(`${config.baseUrl}/api/auth/register`, data)

export const login = (data) => axios.post(`${config.baseUrl}/api/auth/login`, data)

export const test = () => axios.get(`${config.baseUrl}/api/Auth/test`)

export const verify = (id) => axios.post(`${config.baseUrl}/api/user/verify/${id}`)

export const getCurrentUser = () => JSON.parse(localStorage.getItem('jwtToken'))

export const getInstructorsBySchool = (schoolId, categoryId) => axios.get(`${config.baseUrl}/api/User/instructors/school/${schoolId}/${categoryId}`, { headers: authHeader() })

export const getStudentsForExam = (schoolId) => axios.get(`${config.baseUrl}/api/User/students/exam/${schoolId}`, { headers: authHeader() })

export const getAllUsers = () => axios.get(`${config.baseUrl}/api/User/all`, { headers: authHeader() })

export const deleteUser = (id) => axios.delete(`${config.baseUrl}/api/User/${id}`, { headers: authHeader() })

export const getUser = (id) => axios.get(`${config.baseUrl}/api/User/${id}`, { headers: authHeader() })

export const updateUser = (id, data) => axios.put(`${config.baseUrl}/api/User/${id}`, data, { headers: authHeader() })

export const chooseInstrcutor = (studentId, instructorId) => axios.put(`${config.baseUrl}/api/User/${studentId}/${instructorId}`, { headers: authHeader() })

export const studentPassTheory = (id) => axios.put(`${config.baseUrl}/api/User/pass-theory/${id}`, { headers: authHeader() })

export const getAvailableExaminers = (startTime, endTime) => axios.get(`${config.baseUrl}/api/User/examiners`, startTime, endTime, { headers: authHeader() })