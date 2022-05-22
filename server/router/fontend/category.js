const verifyAuthorize = require('../../middleware/verifyAuthorize')
module.exports = (app) => {
    app.get('/fontend/api/category',(req,res)=>{
        if(JSON.stringify(req.query) !== '{}'){
            // res.send(await req.model.find(req.query))
            require('../../model/category').aggregate([
                {
                  $lookup: {
                    from: "articles",
                    localField: "cateName", //ArticleCateModel里的分类名
                    foreignField: "cateName", //ArticleModel里的分类名
                    as: "items"  //表示ArticleCateModel创建一个items属性，将相关联的所有ArticleModel数据对象放里面
                  },
                },
                {//匹配限制，查询条件为req.query
                    $match: req.query
                }
              
              ],function(err,docs){
                  console.log("查看分类")
                console.log(JSON.stringify(docs)) //输出查看
                res.send(docs)
              })
        }else{
            require('../../model/category').aggregate([
                {
                  $lookup: {
                    from: "articles",
                    localField: "cateName", 
                    foreignField: "cateName", 
                    as: "items"  
                  },
                },
               
              ],function(err,docs){
                console.log(JSON.stringify(docs)) //输出查看
                res.send(docs)
              })
        }
        
    })
}