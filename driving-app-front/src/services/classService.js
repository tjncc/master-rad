import axios from 'axios'
import config from '../config'
import authHeader from '../helpers/authHeader';

export const addClass = (data) => axios.post(`${config.baseUrl}/api/DrivingClass`, data, { headers: authHeader() })

export const getClassesByUser = (id) => axios.get(`${config.baseUrl}/api/DrivingClass/user/${id}`, { headers: authHeader() })

export const confirmEvent = (id) => axios.put(`${config.baseUrl}/api/DrivingClass/confirm/${id}`, { headers: authHeader() })

export const removeEvent = (id) => axios.delete(`${config.baseUrl}/api/DrivingClass/remove/${id}`, { headers: authHeader() })