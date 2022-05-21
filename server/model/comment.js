const mongoose = require('mongoose')
const dayjs = require('dayjs')
const TalkSchema = new mongoose.Schema({
    content: String,
    time: {
        type: String,
        set(){
            return dayjs().format('YYYY-MM-DD HH:mm');
        }
    }

})
module.exports = mongoose.model('Comment',TalkSchema)