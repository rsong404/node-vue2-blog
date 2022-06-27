const verifyAuthorize = require('../../middleware/verifyAuthorize')
module.exports = (app) => {
    app.get('/admin/api/category',verifyAuthorize,(req,res)=>{
        if(JSON.stringify(req.query) !== '{}'){
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
                res.send(docs)
              })
        }
        
    })
}