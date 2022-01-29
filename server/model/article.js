const mongoose = require('mongoose')
const dayjs = require('dayjs')
const ArticleSchema = new mongoose.Schema({
    title: String,
    cateName: String,
    cid: {
        type: mongoose.Schema.Types.ObjectId
    },
    tags: [],
    tagsID:[{type:mongoose.Schema.Types.ObjectId}],
    coverPicture: String,
    userName: String,
    contents: String,
    time: {
        type: String,
        set(){
            return dayjs().format('YYYY-MM-DD');
        }
    }

})
module.exports = mongoose.model('Article',ArticleSchema)