import axios from 'axios'
import urlConfig from './baseUrlConfig'
const http = axios.create({
    baseURL: urlConfig.baseurl,
  });

export default http