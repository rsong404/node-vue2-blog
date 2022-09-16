let baseUrl = {
  development: 'http://localhost:3000/admin/api/',
  production: 'https://修改成你自己的域名/admin/api/',
}
export default { baseurl: baseUrl[process.env.NODE_ENV] }
