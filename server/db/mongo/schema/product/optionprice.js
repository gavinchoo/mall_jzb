var mongoose = require('mongoose')
var OptionsSchema = require('./options')
/**
 *  商品型号价格
 */
var Schema = mongoose.Schema

var PricesSchema = new Schema({
    price: Number,
    product_option_id: String,
})

var OptionPricesSchema = new Schema({
    product_id: {type: String, required: true},
    option: [OptionsSchema],
    option_price: [PricesSchema],
})

module.exports = OptionPricesSchema