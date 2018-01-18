var mongoose = require('mongoose')
var AddressSchema = require('../address/address')
var CartChildSchema = require('../cart/cartchild')

var Schema = mongoose.Schema
var OrderSchema = new Schema({
    user_id: String,
    order_no: String,
    shop_id: {type: String, required: true},
    shop_title: String,
    im_account: String,
    buyer_status: String,
    buyer_status_text: String,
    seller_status: String,
    seller_status_text: String,
    create_time: {type: Date, default: Date.now},
    total_price: Number,
    address: {type: AddressSchema, required: true},
    products: [CartChildSchema],
})

module.exports = OrderSchema