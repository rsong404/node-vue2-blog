let baseUrl = {
  development: 'http://localhost:3000/admin/api/',
  production: 'https://kkan.top/admin/api/',
}
export default { baseurl: baseUrl[process.env.NODE_ENV] }
