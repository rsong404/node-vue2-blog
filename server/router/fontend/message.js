const nodemailer = require('nodemailer')
const dayjs = require('dayjs')
module.exports = (app) => {
    //创建一个SMTP客户端配置对象,可以在邮箱的设置里开启和获取授权码，不懂的可以百度 nodemailer 这个插件，有详细使用教程
    let transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      secure: true,
      auth: {
        user: '填写你的QQ邮箱', //填写你的QQ邮箱，当别人在你博客留言时将用此邮箱通知提醒你
        pass: '填写你的授权码' //邮箱的授权码 QQ邮箱为例，需要在自己的邮箱设置/账号下面的SMTP服务开启配置生成,并不是邮件的登录密码
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
          from: `填写你的QQ邮箱`,//填写你的QQ邮箱
          to: '填写你的邮箱', //这里需填写一个和上面接收邮箱，确保通知到你，如xxxx@163.com,上面邮箱都行，只要你能收到
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