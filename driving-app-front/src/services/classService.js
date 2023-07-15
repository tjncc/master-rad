import axios from 'axios'
import config from '../config'
import authHeader from '../helpers/authHeader';

export const addClass = (data) => axios.post(`${config.baseUrl}/api/DrivingClass`, data, { headers: authHeader() })

export const getClassesByUser = (id) => axios.get(`${config.baseUrl}/api/DrivingClass/user/${id}`, { headers: authHeader() })