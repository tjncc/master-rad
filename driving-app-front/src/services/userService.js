import axios from 'axios'
import config from '../config'
import authHeader from '../helpers/authHeader';

export const register = (data) => axios.post(`${config.baseUrl}/api/auth/register`, data)

export const login = (data) => axios.post(`${config.baseUrl}/api/auth/login`, data)

export const test = () => axios.get(`${config.baseUrl}/api/Auth/test`)

export const verify = (id) => axios.post(`${config.baseUrl}/api/user/verify/${id}`)

export const getCurrentUser = () => JSON.parse(localStorage.getItem('jwtToken'))

export const getInstructorsBySchool = (schoolId, data) => axios.get(`${config.baseUrl}/api/User/instructors/school/${schoolId}`, data)

export const getAllUsers = () => axios.get(`${config.baseUrl}/api/User/all`,  {headers: authHeader()} )

export const deleteUser = (id) => axios.delete(`${config.baseUrl}/api/User/${id}`,  {headers: authHeader()} )
