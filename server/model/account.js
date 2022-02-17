const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');

const AccountSchema = new mongoose.Schema({
    userName: String,
    password: {
        type:String,
        set(value){
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(value, salt);
        }
    },

})
module.exports = mongoose.model('Account',AccountSchema)