var mongoose = require('../dbconnect')

var Schema = mongoose.Schema
var UserSchema = new Schema({
    username: String,
    pwd: String,
    token: String,
    createtime: Date,
})
var UserDb = mongoose.model('users', UserSchema)

module.exports = UserDb