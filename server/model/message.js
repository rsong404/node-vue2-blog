const mongoose = require('mongoose')
const dayjs = require('dayjs')
const MessageSchema = new mongoose.Schema({
    nick: String,
    avatar: String,
    content: String,
    reply: [{
        parentId:String,
        nick: String,
        avatar:String,
        content: String,
        time:{
            type: String,
        set(){
            return dayjs().format('YYYY-MM-DD-hh:mm');
        }
        }
    }],
    time: {
        type: String,
        set(){
            return dayjs().format('YYYY-MM-DD-hh:mm');
        }
    }

})
module.exports = mongoose.model('Message',MessageSchema)