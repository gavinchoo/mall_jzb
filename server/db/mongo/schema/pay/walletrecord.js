var mongoose = require('mongoose')

var Schema = mongoose.Schema
var WalletRecordSchema = new Schema({
    user_id: String,
    sign: String,
    title: String,
    desc: String,
    money: String,
    status: String,
    status_text: String,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now}
})

module.exports = WalletRecordSchema