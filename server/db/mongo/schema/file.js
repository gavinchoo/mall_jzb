var mongoose = require('mongoose')

var Schema = mongoose.Schema
var FileSchema = new Schema({
    userid:String,
    mimetype:String,
    filename: String,
    originalname: String,
    ext: String,
    path: String,
    size: Number,
})
mongoose.model('File', FileSchema)