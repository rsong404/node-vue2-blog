let  baseUrl = {
    development: 'http://localhost:3000/fontend/api/',
    // production: 'https://kkan.top/fontend/api/'
    production: 'http://localhost:3000/fontend/api/'
}
export default {baseurl: baseUrl[process.env.NODE_ENV]}