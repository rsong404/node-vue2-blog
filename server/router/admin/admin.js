module.exports = app => {
    const express = require('express')
    const router = new express.Router({
        mergeParams: true 
    })
    const modelware = require('../../middleware/modelware') 

    //查询数据
    router.get('/', async(req,res) => {
        if(JSON.stringify(req.query) !== '{}'){
            res.send(await req.model.find(req.query))
        }else{
            res.send(await req.model.find({}))
        }
        
    })

    //添加数据
    router.post('/', async(req,res) => {
        const data = await req.model.create(req.body)
        res.send(data)
        console.log('添加数据' + data)
        
    })

    //修改数据
    router.put('/', async(req,res) => {
        const data = await req.model.updateOne({_id:req.query._id},req.body)
        res.status(200).send(data)
        console.log('修改数据' + data)
    })

    //删除数据
    router.delete('/', async(req,res) => {
        const data = await req.model.deleteOne(req.query)
        res.send(data)
        console.log('删除数据：'+ JSON.stringify(data))
    })
    //分类和tag查询另起路由
    app.get('/admin/api/tag',(req,res)=>{
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
                console.log(JSON.stringify(docs)) //输出查看
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
                console.log(JSON.stringify(docs)) //输出查看
                res.send(docs)
              })
        }
        
    })

    app.use('/admin/api/:type',modelware,router)
}