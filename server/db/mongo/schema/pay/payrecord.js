var mongoose = require('mongoose')

var Schema = mongoose.Schema
var PayRecordSchema = new Schema({
    user_id: String,
    money: Number,
    paycode: String,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now}
})

module.exports = PayRecordSchema