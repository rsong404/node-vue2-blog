const dayjs = require('dayjs')
const mongoose = require('mongoose')
const CateSchema = new mongoose.Schema({
    cateName: {type:String,ref:'Article'},
    time:{
        type:String,
        set(){
            return dayjs().format('YYYY-MM-DD');
        }
    },
    // items:[{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
})

module.exports = mongoose.model('Categroy',CateSchema)