var mongoose = require('mongoose')
var FileSchema = require('../file/file')
var CategorySchema = require('./category')
var Schema = mongoose.Schema
var ProductSchema = new Schema({
    title: {type: String, required: true, title: "商品名称"},
    price: {type: Number, required: true, title: "商品价格"},
    maxprice: {type: Number, title: "最高价格"},
    price_start: {type: Number, title: "原价"},
    option_price: {type: Number},
    cash_deposit: {type: Number},
    identify_price: {type: Number, title: "鉴定价格"},
    activity_short_desc: {type: String, title: "简述"},
    activity_title: {type: String},
    auction_count: {type: Number},
    type: {type: CategorySchema, title: "类型"},
    image_path: String,
    shop_id: {type: String, required: true},
    shop_title: {type: String, title: "店名"},
    category_id: {type: String},
    category_title: {type: String},
    address: {type: String},
    address_full: {type: String},
    province_id: {type: String},
    city_id: {type: String},
    area_id: {type: String},
    description: {type: String},
    quantity: {type: Number},
    sales: {type: Number, title: "销量"},
    create_time: {type: Date, default: Date.now},
    status: {type: String},
    status_text: {type: String},
    security_7days: {type: String}, /** 支持7天无理由退货，[1:是, 0:否] */
    security_delivery: {type: String}, /** 0:否，1:24小时，2:48小时，3:72小时 */
    in_special_panic: {type: String},
    in_special_gift: {type: String},
    is_auaction_permission: String,
    start_time: {type: String},
    end_time: {type: String},
    is_auaction_permission: {type: String},
    movie: {type: [FileSchema]},
    images: {type: [FileSchema]},
})

module.exports = ProductSchema