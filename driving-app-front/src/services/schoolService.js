import axios from 'axios'
import config from '../config'
import authHeader from '../helpers/authHeader';

export const addSchool = (data) => axios.post(`${config.baseUrl}/api/school`, data, { headers: authHeader() })

export const getAllSchools = () => axios.get(`${config.baseUrl}/api/school`)

export const getSchool = (id) => axios.get(`${config.baseUrl}/api/school/${id}`, { headers: authHeader() })

export const deleteSchool = (id) => axios.delete(`${config.baseUrl}/api/school/${id}`, { headers: authHeader() })

export const updateSchool = (id, data) => axios.put(`${config.baseUrl}/api/school/${id}`, data, { headers: authHeader() })

export const test = () => axios.get(`${config.baseUrl}/api/school/test`, { headers: authHeader() })
