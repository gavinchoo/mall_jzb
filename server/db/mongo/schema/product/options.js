var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
/**
 *  商品型号
 */
var Schema = mongoose.Schema

var ChildSchema = new Schema({
    pid: String,
    title: {type: String, unique : true, required: true},
})

var OptionsSchema = new Schema({
    pid: String,
    title: {type: String, unique : true, required: true},
    child: [ChildSchema],
})

OptionsSchema.plugin(uniqueValidator)
module.exports = OptionsSchema