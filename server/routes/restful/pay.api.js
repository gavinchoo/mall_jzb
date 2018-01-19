var {handleResponse, OperateType} = require('../../common/http/hander.response')
var {ResponseSuccess, ResponseError} = require('../../common/http/response.result')

var WalletDb = require('../../db/mongo/index').Wallet

module.exports = {
    init: function (app, auth) {
        app.post('/Pay/Recharge', auth, this.recharge)
    },

    recharge: function (req, res) {

    }
}