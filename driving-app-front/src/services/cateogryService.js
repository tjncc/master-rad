import axios from 'axios'
import config from '../config'

export const getCategories = () => axios.get(`${config.baseUrl}/user/categories`)
