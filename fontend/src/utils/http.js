import axios from 'axios'
const http = axios.create({
    baseURL: 'http://localhost:3000/fontend/api/',
  });

export default http