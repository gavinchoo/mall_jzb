var mongoose = require('../dbconnect')

var Schema = mongoose.Schema
var AddressSchema = new Schema({
    userid: String,
    realname: String,
    is_default: String,
    address: String,
    province_id: String,
    province: String,
    city_id: String,
    city: String,
    area_id: String,
    area: String,
})
var AddressSchema = mongoose.model('address', AddressSchema)

module.exports = AddressSchema