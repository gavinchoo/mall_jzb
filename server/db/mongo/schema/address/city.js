var mongoose = require('mongoose')

var Schema = mongoose.Schema
var CitySchema = new Schema({
    id: {type: String},
    name: {type: String},
    fullname: {type: String},
    pinyin: [String],
    location: {lat: Number, lng: Number},
})
mongoose.model('City', CitySchema)