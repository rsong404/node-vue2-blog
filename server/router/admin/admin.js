const verifyAuthorize = require('../../middleware/verifyAuthorize')
const nodemailer = require('nodemailer')
module.exports = (app) => {
  const express = require('express')
  const router = new express.Router({
    mergeParams: true,
  })
  const modelware = require('../../middleware/modelware')

  //回复留言相关
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secure: true,
    auth: {
      user: '填写你的QQ邮箱', //填写你的QQ邮箱，当别人在你博客留言时将用此邮箱通知提醒你
      pass: '填写你的授权码' //邮箱的授权码 QQ邮箱为例，需要在自己的邮箱设置/账号下面的SMTP服务开启配置生成,并不是邮件的登录密码
    }
  })
  //查询数据
  router.get('/', async (req, res) => {
    if (JSON.stringify(req.query) !== '{}') {
      res.send(await req.model.find(req.query))
    } else {
      res.send(await req.model.find({}))
    }
  })

  //添加数据
  router.post('/', async (req, res) => {
    const data = await req.model.create(req.body)
    res.send(data)
  })

  //修改数据
  router.put('/', async (req, res) => {
    const data = await req.model.updateOne({ _id: req.query._id }, req.body)
    // 如果是回复留言，则邮件通知对方留言者
    if (req.query.reply) {
      let info = JSON.parse(req.query.reply)
      let contents = info.content
      let replyEmail = info.email
      let sendHtml = `<div>
        <div>留言者：YRsong丶博客</div>//
        <div>内容：${contents}</div>
        </div>`
      let emailOptions = {
        from: 'xxxx@163.com', //这里改成你的邮箱，和上面的邮箱相同，将用此邮箱给留言者回复
        to: replyEmail,
        // 邮件主题
        subject: '你在YRsong丶博客的留言有回复了！', //改成你想要的主题
        html: sendHtml,
      }
      transporter.sendMail(emailOptions, function (err, info) {
        if (err) return console.log(err)
      })
    }
    res.status(200).send(data)
  })

  //删除数据
  router.delete('/', async (req, res) => {
    const data = await req.model.deleteOne(req.query)
    res.send(data)
  })

  //分类和tag查询另起路由
  require('./login')(app)
  require('./tag')(app)
  require('./account')(app)
  require('./upload')(app)

  app.use('/admin/api/:type', verifyAuthorize, modelware, router)
}
