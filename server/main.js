const express = require('express')
const app = express()
app.use(express.json())
//连接数据库
require('./plugins/connection')()

//后台管理路由
require('./router/admin/admin')(app)



app.listen(3000,() => {
    console.log("服务启动成功，请访问：http://localhost:3000")
})