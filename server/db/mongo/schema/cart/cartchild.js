var mongoose = require('mongoose')
var ProductSchema = require('../product/product')
var Schema = mongoose.Schema
var CartChildSchema = new Schema({
    product: ProductSchema,
    quantity: Number,
    option_ids: String,
    price: Number,
})
module.exports = CartChildSchema