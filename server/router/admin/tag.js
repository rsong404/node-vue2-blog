const verifyAuthorize = require('../../middleware/verifyAuthorize')

module.exports = (app) => {
    app.get('/admin/api/tag',verifyAuthorize,(req,res)=>{
        if(JSON.stringify(req.query) !== '{}'){
            // res.send(await req.model.find(req.query))
            require('../../model/tag').aggregate([
                {
                  $lookup: {
                    from: "articles",
                    localField: "tagName", //ArticleCateModel里的_id
                    foreignField: "tags", //ArticleModel里的cid
                    as: "items"  //表示ArticleCateModel创建一个items属性，将相关联的所有ArticleModel数据对象放里面
                  },
                },
                {//匹配限制，查询条件为req.query
                    $match: req.query
                }
              
              ],function(err,docs){
                // console.log(JSON.stringify(docs)) //输出查看
                res.send(docs)
              })
        }else{
            require('../../model/tag').aggregate([
                {
                  $lookup: {
                    from: "articles",
                    localField: "tagName", 
                    foreignField: "tags", 
                    as: "items"  
                  },
                },
               
              ],function(err,docs){
                // console.log(JSON.stringify(docs)) //输出查看
                res.send(docs)
              })
        }
        
    })

    // 删除数据
    app.delete('/admin/api/tag',verifyAuthorize,async (req,res) =>{
      // 批量删除无用标签
      let result = await require('../../model/tag').remove({ _id: { $in: req.query.useLess } })
      res.send(result)
    })
}