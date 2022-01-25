const mongoose = require('mongoose')
const dayjs = require('dayjs')
const ArticleSchema = new mongoose.Schema({
    title: String,
    cate: String,
    tags: [],
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