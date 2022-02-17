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
    require('./login')(app)
    require('./tag')(app)
    require('./category')(app)
    require('./account')(app)

    app.use('/admin/api/:type',modelware,router)
}