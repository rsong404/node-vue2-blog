const verifyAuthorize = require('../../middleware/verifyAuthorize')

const bcrypt = require('bcryptjs')
const model = require('../../model/account')
module.exports = app => {
    //查找账号
    app.get('/admin/api/account',verifyAuthorize,async(req,res) => {
        const result = await model.find({})
        res.send(result)
    })
    app.post('/admin/api/account',verifyAuthorize,async(req,res) => {
        const result = await model.find({userName: req.body.userName})
        if(result.length > 0){
            res.send({result:false,wrongMessage:'该账号已存在，请重新输入！'})
            return
        }
        const result2 = await model.create(req.body)
        res.send(result2)
    })
    //删除账号
    app.delete('/admin/api/account', async(req,res) => {
        const all = await model.find({})
        if(all.length <= 1) {
            res.send({result:false,wrongMessage:'只有1个管理账户，无法删除！'})
            return
        }
        const result1 = await model.findOne({_id:req.query._id})
        const result2 = bcrypt.compareSync(req.query.password, result1.password);
        
        if(result2){
            if(result1.userName === 'admin'){
                res.send({result:false,wrongMessage:'该账户无法删除无法删除！'})
                return
            }
            await model.deleteOne({_id:req.query._id})
            res.send({result:true})
        }else{
            res.send({result:false})
        }
    })
}