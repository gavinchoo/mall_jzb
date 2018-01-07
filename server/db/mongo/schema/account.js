var mongoose = require('mongoose')

var Schema = mongoose.Schema
var AccountSchema = new Schema({
    userid: String,
    nickname: String,
    avatar_url: String,
    sex: String,
})
mongoose.model('Account', AccountSchema)