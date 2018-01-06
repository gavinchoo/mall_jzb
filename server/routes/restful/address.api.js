var ResponseResult = require('../model/response.result')
var AddressDb = require('../../db/mongo/index').Address
var logger = require('../../common/logger')

module.exports = {
    init: function (app, auth) {
        app.post('/User/addReceiveAddr', auth,this.addReceiveAddr)
        app.post('/User/delReceiveAddr', auth, this.delReceiveAddr)
        app.post('/User/editReceiveAddr', auth, this.editReceiveAddr)
        app.post('/User/getReceiveAddrs', auth, this.getReceiveAddrs)
    },

    addReceiveAddr: function (req, res) {
        var props = req.body
        props['userid'] = req.user._doc._id
        AddressDb.create(props, function (err, result) {
            if (err) {
                logger.error(err)
                res.status(400).json(new ResponseResult(0, err.message))
            } else {
                if (result == null) {
                    res.json(new ResponseResult(0, '添加地址失败'))
                }
                else {
                    res.json(new ResponseResult(1, '添加地址成功'))
                }
            }
        })
    },

    delReceiveAddr: function (req, res) {
        var props = req.body
        props['userid'] = req.user._doc._id
        AddressDb.remove(props, function (err, result) {
            if (result == null) {
                logger.error(err)
                res.json(new ResponseResult(0, '删除地址失败'))
            }
            else {
                res.json(new ResponseResult(1, '删除地址成功'))
            }
        })
    },

    editReceiveAddr: function (req, res) {
        var userId = req.user._doc._id;
        AddressDb.update({userid: userId}, req.props, function (err, result) {
            if (result != null && result.nModified == 1) {
                res.json(new ResponseResult(1, "修改地址成功"));
            } else {
                res.json(new ResponseResult(0, '修改地址失败'));
            }
        })
    },

    getReceiveAddrs: function (req, res) {
        var userId = req.user._doc._id;
        AddressDb.find({userid: userId}, function (err, result) {
            if (result != null) {
                res.json(new ResponseResult(1, "获取地址成功", result));
            } else {
                res.json(new ResponseResult(0, '获取地址失败'));
            }
        })
    }
}
