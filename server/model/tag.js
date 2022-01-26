const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    tagName: String,
    articleId: mongoose.Schema.Types.ObjectId

})
module.exports = mongoose.model('User',UserSchema)