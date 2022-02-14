const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    imgsrc: String,
})
module.exports = mongoose.model('Carousel',UserSchema)