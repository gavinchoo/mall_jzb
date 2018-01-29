var mongoose = require('mongoose')

var Schema = mongoose.Schema
var ChildSchema = new Schema({
    pid: String,
    title: String,
    sort: String,
})
var CategorySchema = new Schema({
    pid: String,
    title: String,
    image: String,
    sort: String,
    child: [ChildSchema]
})

module.exports = CategorySchema