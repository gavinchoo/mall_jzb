var {handleResponse, OperateType} = require('../../common/http/hander.response')
var AddressDb = require('../../db/mongo/index').Address
var logger = require('../../common/util/logger')

module.exports = {
    init: function (app, auth) {
        app.post('/User/addReceiveAddr', auth, this.addReceiveAddr)
        app.post('/User/delReceiveAddr', auth, this.delReceiveAddr)
        app.post('/User/editReceiveAddr', auth, this.editReceiveAddr)
        app.post('/User/getReceiveAddrs', auth, this.getReceiveAddrs)
    },

    addReceiveAddr: function (req, res) {
        var props = req.body
        props['userid'] = req.user._doc._id
        AddressDb.create(props, function (err, result) {
            handleResponse(OperateType.Create, res, err, result);
        })
    },

    delReceiveAddr: function (req, res) {
        var props = req.body
        props['userid'] = req.user._doc._id
        AddressDb.remove(props, function (err, result) {
            handleResponse(OperateType.Remove, res, err, result);
        })
    },

    editReceiveAddr: function (req, res) {
        var userId = req.user._doc._id;
        AddressDb.update({userid: userId}, req.props, function (err, result) {
            handleResponse(OperateType.Edit, res, err, result);
        })
    },

    getReceiveAddrs: function (req, res) {
        var userId = req.user._doc._id;
        AddressDb.find({userid: userId}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result);
        })
    }
}
