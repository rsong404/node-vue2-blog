const dayjs = require('dayjs')
const mongoose = require('mongoose')
const WebsiteSchema = new mongoose.Schema({
    websiteName: String,
    type: String,
    website: String,
    time:{
        type:String,
        set(){
            return dayjs().format('YYYY-MM-DD');
        }
    },
})

module.exports = mongoose.model('Website',WebsiteSchema)