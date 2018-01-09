var mongoose = require('mongoose')
var FileSchema = require('../file')

var Schema = mongoose.Schema
var ProductSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    maxprice: Number,
    price_start: Number,
    option_price: Number,
    cash_deposit: Number,
    identify_price: Number,
    activity_short_desc: String,
    activity_title: String,
    auction_count: Number,
    type: String,
    image_path: String,
    shop_id: {type: String, required: true},
    shop_title: String,
    category_id: String,
    category_title: String,
    address: String,
    address_full: String,
    province_id: String,
    city_id: String,
    area_id: String,
    description: String,
    quantity: Number,
    sales: Number,
    status: String,
    status_text: String,
    security_7days: String, /** 支持7天无理由退货，[1:是, 0:否] */
    security_delivery: String, /** 0:否，1:24小时，2:48小时，3:72小时 */
    in_special_panic: String,
    in_special_gift: String,
    is_auaction_permission: String,
    start_time: String,
    end_time: String,
    is_auaction_permission: String,
    movie: FileSchema,
    images: [FileSchema],
})

module.exports = ProductSchema