const modelware = require('../../middleware/modelware')
module.exports = app => {
    const express = require('express')
    const router = new express.Router({mergeParams:true})
    router.get('/',async (req,res)=>{
        let result = await req.model.find({})
        res.send(result)
    })
    require('./category')(app)
    require('./tag')(app)

    app.use('/fontend/api/:type',modelware,router)
}