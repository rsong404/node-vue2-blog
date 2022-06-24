const nodemailer = require('nodemailer')
const dayjs = require('dayjs')
module.exports = (app) => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      secure: true,
      auth: {
        user: '863426570@qq.com',
        pass: 'jrvgtbkypyndbccf'
      }
    })
    app.post('/fontend/api/message',async (req,res)=>{
      req.body.time = dayjs().format('YYYY-MM-DD-HH:mm');
      let result = await require('../../model/message').create(req.body)
        let nick = req.body.nick
        let email = req.body.email
        let time = req.body.time
        let contents = req.body.content
        let sendHtml = `<div>
        <div>留言者：${nick}</div>
        <div>留言者邮箱：${email}</div>
        <div>时间：${time}</div>
        <div>内容：${contents}</div>
        </div>`
        let emailOptions = {
          from: '863426570@qq.com',
          to: 'rsong404@163.com',
          // 邮件主题
          subject: '你的博客上有新留言！',
          html: sendHtml
        }
        transporter.sendMail(emailOptions,function(err,info){
          if(err) return console.log(err)
        })
        res.send(result)
    })
}