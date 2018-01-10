var mongoose = require('mongoose')

var Schema = mongoose.Schema
var OrderSchema = new Schema({
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

module.exports = OrderSchema