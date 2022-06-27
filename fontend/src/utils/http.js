import axios from 'axios'
import urlConfig from './baseUrlConfig'
const http = axios.create({
    // baseURL: 'http://localhost:3000/fontend/api/',
    // baseURL: process.env.VUE_APP_API_URL || '',
    baseURL: urlConfig.baseurl,
  });

export default http