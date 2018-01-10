var mongoose = require('mongoose')

var Schema = mongoose.Schema
var CategorySchema = new Schema({
    pid:String,
    title:String,
    image: String,
    sort: String,
})

module.exports = CategorySchema