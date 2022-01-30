const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    tagName: String,
    // articleTag: mongoose.Schema.Types.ObjectId

})
module.exports = mongoose.model('Tag',UserSchema)