var {handleResponse, OperateType} = require('../model/hander.response')
var {ResponseSuccess, ResponseError} = require('../model/response.result')

var WalletDb = require('../../db/mongo/index').Wallet

module.exports = {
    init: function (app, auth) {
        app.post('/Pay/Recharge', auth, this.recharge)
    },

    recharge: function (req, res) {

    }
}