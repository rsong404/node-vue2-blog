const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    realName: String,
    telephone: Number,
    QQ: Number,
    motto: String,
    avatar: String

})
module.exports = mongoose.model('User',UserSchema)