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
require('./model/category').aggregate([
    {
      $lookup: {
        from: "articles",
        localField: "cateName", //ArticleCateModel里的_id
        foreignField: "cateName", //ArticleModel里的cid
        as: "items"  //表示ArticleCateModel创建一个items属性，将相关联的所有ArticleModel数据对象放里面
      },
    },
  
  ],function(err,docs){
    console.log(JSON.stringify(docs)) //输出查看
  })

  
app.listen(3000,() => {
    console.log("服务启动成功，请访问：http://localhost:3000")
})