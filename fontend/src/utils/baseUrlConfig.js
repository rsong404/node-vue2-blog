let  baseUrl = {
    development: 'http://localhost:3000/fontend/api/',
    production: 'https://kkan.top:6666/fontend/api/'
}
export default {baseurl: baseUrl[process.env.NODE_ENV]}