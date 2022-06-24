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
    host: 'smtp.163.com',
    secure: true,
    auth: {
      user: 'rsong404@163.com',
      pass: 'OKOXKBWPLGXYLAHC',
    },
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
    // console.log('添加数据' + data)
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
        <div>留言者：YRsong丶博客</div>
        <div>内容：${contents}</div>
        </div>`
      let emailOptions = {
        from: 'rsong404@163.com',
        to: replyEmail,
        // 邮件主题
        subject: '你在YRsong丶博客的留言有回复了！',
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
    // console.log('删除数据：'+ JSON.stringify(data))
  })

  //分类和tag查询另起路由
  require('./login')(app)
  require('./tag')(app)
  // require('./category')(app)
  require('./account')(app)
  require('./upload')(app)

  app.use('/admin/api/:type', verifyAuthorize, modelware, router)
}
