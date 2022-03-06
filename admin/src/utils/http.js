import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api/',
  });

//请求拦截器
http.interceptors.request.use(req => {
  if(window.localStorage.token){
    req.headers.Authorization = window.localStorage.token
  }
  return req
},err => {
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message
  })
  return Promise.reject(err)
})
//响应拦截器
http.interceptors.response.use(res => {
  if(res.data.message){
      Vue.prototype.$message({
          type: 'success',
          message: res.data.message
      })
  }
  return res
}, err => {
  if(err.response.data.message){
      Vue.prototype.$message({
          type: 'error',
          message: err.response.data.message
      })
      router.push('/login')
  }
  return Promise.reject(err)
})

export default http