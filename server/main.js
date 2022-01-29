const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
//连接数据库
require('./plugins/connection')()

//后台管理路由
require('./router/admin/admin')(app)
// let obj1 = {tag:['12']}
// let obj2 = {tag:['12']}
// console.log(JSON.stringify(obj2.tag))
// console.log(JSON.stringify(obj2.tag)===JSON.stringify(obj1.tag))

app.listen(3000,() => {
    console.log("服务启动成功，请访问：http://localhost:3000")
})