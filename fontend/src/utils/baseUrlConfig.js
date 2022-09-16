let  baseUrl = {
    development: 'http://localhost:3000/fontend/api/',
    production: 'https://自己的域名/fontend/api/'
}
export default {baseurl: baseUrl[process.env.NODE_ENV]}