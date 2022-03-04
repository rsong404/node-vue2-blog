const model = require('../../model/account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenSecret = require('../../middleware/tokenSecret')
module.exports = app => {
    
    //登录账号时验证账号和密码
    app.post('/admin/api/login',async (req,res) => {
       let result = await model.findOne({userName:req.body.userName})
       if(result){
           let result2 = bcrypt.compareSync(req.body.password,result.password)
           if(result2){
               //该token24小时后过期
               const token = jwt.sign({id:result._id},tokenSecret,{ expiresIn: 60 * 60 * 24 })
               res.send({token})
           }else{
            res.status(401).send({message:'密码不正确'})
           }
       }else{
           res.status(401).send({message:'该账号不存在'})
       }
    })
   
}