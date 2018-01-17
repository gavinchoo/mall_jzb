var mongoose = require('mongoose')
var AddressSchema = require('../address/address')
var ProductSchema = require('../product/product')

var Schema = mongoose.Schema
var OrderSchema = new Schema({
    order_no: String,
    shop_id: {type: String, required: true},
    shop_title: String,
    im_account: String,
    buyer_status: String,
    buyer_status_text: String,
    seller_status: String,
    seller_status_text: String,
    create_time: String,
    total_price: Number,
    address: AddressSchema,
    products: [ProductSchema],
})

module.exports = OrderSchema