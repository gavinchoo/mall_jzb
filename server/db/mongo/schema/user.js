var mongoose = require('mongoose')

var Schema = mongoose.Schema
var UserSchema = new Schema({
    username: String,
    pwd: String,
    token: String,
    createtime: Date,
})
mongoose.model('User', UserSchema)