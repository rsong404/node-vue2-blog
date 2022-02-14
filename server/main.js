const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
//连接数据库
require('./plugins/connection')()

//后台管理路由
require('./router/admin/admin')(app)


// const student = new require('./model/blog')({
//     blogName:'夏日丶蝉',
//     userName:'杨荣宋',
//     defcoverPicture:'https://gitee.com/rs404/picgo_img/raw/master/images/wanye.jpg',
//     startTime:'2022-2-14',
//     recordNumber:'粤ICP备2021084019号'

// })
const student = new require('./model/blog')({
    realName: '杨荣宋',
    telephone: 15602679045,
    mail: '863426570@qq.com',
    wechat:15602679045,
    motto: '凡事需尽力',
    avatar: 'https://gitee.com/rs404/picgo_img/raw/master/images/logo.jpg'

})




app.listen(3000,() => {
    console.log("服务启动成功，请访问：http://localhost:3000")
})