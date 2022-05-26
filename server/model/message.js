const mongoose = require('mongoose')
const dayjs = require('dayjs')
const MessageSchema = new mongoose.Schema({
    nick: String,
    avatar: String,
    content: String,
    email: String,
    time: String,
    reply: [{
        parentId:String,
        nick: String,
        avatar:String,
        content: String,
        time: String,
    }],

})
module.exports = mongoose.model('Message',MessageSchema)