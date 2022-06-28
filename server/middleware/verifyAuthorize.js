let jwt = require('jsonwebtoken')
let secret = require('./tokenSecret')
module.exports = async (req, res, next) => {
  let authorization = req.headers.authorization
  if (authorization) {
    jwt.verify(authorization, secret, async function (err, data) {
      if (err) {
        res.status(403).send({ message: '无效授权，请重新登录' })
        return
      }
      let model = require('../model/account')
      let result = await model.findOne({ _id: data.id })
      if (result) {
        next()
        return
      } else {
        res.status(403).send({ message: '无效授权，请重新登录' })
      }
    })
  } else {
    res.status(401).send({ message: '请先登录登录' })
  }
}
