const mongoose = require('mongoose')
const dayjs = require('dayjs')
const BlogSchema = new mongoose.Schema({
    blogName: String,
    userName: String,
    defcoverPicture: String,
    bulletin: String,
    startTime: {
        type: String,

    },
    recordNumber: String

})
module.exports = mongoose.model('Blog',BlogSchema)