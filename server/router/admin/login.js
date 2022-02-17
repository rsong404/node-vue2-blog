const model = require('../../model/account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = app => {
    
    //验证账号和密码
    app.post('/admin/api/login',async (req,res) => {
       let result = await model.findOne({userName:req.body.userName})
       if(result){
           let result2 = bcrypt.compareSync(req.body.password,result.password)
           if(result2){
               const token = jwt.sign({id:result._id},'rsong404')
               console.log(token)
               res.send({token})
           }else{
            res.status(401).send({message:'密码不正确'})
           }
       }else{
           res.status(401).send({message:'该账号不存在'})
       }
    })
    //删除
    // app.delete('/admin/api/account', async(req,res) => {
        
    //     const result1 = await model.findOne({_id:req.query._id})
        
    //     const result2 = bcrypt.compareSync(req.query.password, result1.password);
        
    //     if(result2){
    //         await model.deleteOne({_id:req.query._id})
    //         res.send({result:true})
    //     }else{
    //         res.send({result:false})
    //     }
    // })
}