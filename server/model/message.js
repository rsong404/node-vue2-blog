const mongoose = require('mongoose')
const dayjs = require('dayjs')
const MessageSchema = new mongoose.Schema({
    nickName: String,
    contents: String,
    time: {
        type: String,
        set(){
            return dayjs().format('YYYY-MM-DD');
        }
    }

})
module.exports = mongoose.model('Message',MessageSchema)