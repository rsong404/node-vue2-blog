const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    realName: String,
    telephone: Number,
    mail: String,
    wechat:String,
    motto: String,
    avatar: String

})
module.exports = mongoose.model('User',UserSchema)