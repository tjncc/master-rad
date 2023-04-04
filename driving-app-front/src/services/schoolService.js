import axios from 'axios'
import config from '../config'
import authHeader from '../helpers/authHeader';

export const addSchool = (data) => axios.post(`${config.baseUrl}/api/school`, data)

export const getAllSchools = () => axios.get(`${config.baseUrl}/api/school`)

export const test = (token) => axios.get(`${config.baseUrl}/api/school/test`, { headers: authHeader() })
