const verifyAuthorize = require('../../middleware/verifyAuthorize')

const bcrypt = require('bcryptjs')
const model = require('../../model/account')
module.exports = app => {
    //查找账号
    app.get('/admin/api/account',verifyAuthorize,async(req,res) => {
        const result = await model.find({})
        res.send(result)
    })
    //删除账号
    app.delete('/admin/api/account', async(req,res) => {
        
        const result1 = await model.findOne({_id:req.query._id})
        
        const result2 = bcrypt.compareSync(req.query.password, result1.password);
        
        if(result2){
            await model.deleteOne({_id:req.query._id})
            res.send({result:true})
        }else{
            res.send({result:false})
        }
    })
}