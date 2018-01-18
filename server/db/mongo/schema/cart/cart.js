var mongoose = require('mongoose')
var CartChildSchema = require('./cartchild')
var Schema = mongoose.Schema

var CartSchema = new Schema({
    shop_id: {type: String, required: true},
    shop_title: String,
    total_price: Number,
    products: [CartChildSchema],
    user_id: String,
    imei: String,
})

module.exports = CartSchema