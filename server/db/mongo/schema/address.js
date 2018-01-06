var mongoose = require('mongoose')

var Schema = mongoose.Schema
var AddressSchema = new Schema({
    userid: {type: String, required: true},
    realname: {type: String, required: true},
    address: {type: String, required: true},
    province_id: {type: String, required: true},
    province: {type: String, required: true},
    city_id: {type: String, required: true},
    city: {type: String, required: true},
    area_id: String,
    area: String,
    is_default: String,
})
mongoose.model('Address', AddressSchema)