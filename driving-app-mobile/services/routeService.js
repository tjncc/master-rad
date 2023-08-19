import axios from 'axios'
import config from '../helpers/config'
import authHeader from '../helpers/authHeader';

export const addRoute = (data) => axios.post(`${config.baseUrl}/api/route`, data, { headers: authHeader() })

export const getRoute = (id) => axios.get(`${config.baseUrl}/api/route/${id}`, { headers: authHeader() })

export const getRoutesByStudent = (id) => axios.get(`${config.baseUrl}/api/route/student/${id}`, { headers: authHeader() })

export const deleteRoute = (id) => axios.delete(`${config.baseUrl}/api/route/${id}`, { headers: authHeader() })
