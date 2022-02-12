const mongoose = require('mongoose')
const dayjs = require('dayjs')
const TalkSchema = new mongoose.Schema({
    content: String,
    time: {
        type: String,
        set(){
            return dayjs().format('YYYY-MM-DD');
        }
    }

})
module.exports = mongoose.model('Talk',TalkSchema)