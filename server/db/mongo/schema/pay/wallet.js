var mongoose = require('mongoose')

var Schema = mongoose.Schema
var WalletSchema = new Schema({
    user_id: String,
    amount: Number,
    freeze_amount: Number,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now}
})

module.exports = WalletSchema