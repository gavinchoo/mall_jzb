var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema
var ShopSchema = new Schema({
    user_id: String,
    title: {type: String, unique: true, required: true},
    headpic: {type: String},
    signpic: String,
    description: String,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now},
    apply_uid: String,
    status: String,
    amount: Number,
    order_count: Number,
    visitor_count: Number,
    im_account: String,
    applause_Rate: String,
})

ShopSchema.plugin(uniqueValidator, {message: '{VALUE} 已存在'})

module.exports = ShopSchema