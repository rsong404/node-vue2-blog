const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    tagName: String,

})
module.exports = mongoose.model('Tag',UserSchema)