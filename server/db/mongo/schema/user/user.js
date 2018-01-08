var mongoose = require('mongoose')

var Schema = mongoose.Schema
var UserSchema = new Schema({
    username: String,
    pwd: String,
    token: String,
    createtime: {type:Date, default: Date.now},
})
mongoose.model('User', UserSchema)