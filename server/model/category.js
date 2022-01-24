const mongoose = require('mongoose')
const CateSchema = new mongoose.Schema({
    cateName: String,
    items:[{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
})
module.exports = mongoose.model('Categroy',CateSchema)