var ResponseResult = require('../model/response.result')
var AddressDb = require('../../db/mongo/schema/address.schema')
var passport = require('passport')

module.exports = {
    init: function (app) {
        app.post('/User/addReceiveAddr', passport.authenticate('bearer', {session: false}),this.addReceiveAddr)
        app.post('/User/delReceiveAddr', passport.authenticate('bearer', {session: false}), this.delReceiveAddr)
        app.post('/User/editReceiveAddr', passport.authenticate('bearer', {session: false}), this.editReceiveAddr)
        app.post('/User/getReceiveAddrs', passport.authenticate('bearer', {session: false}), this.getReceiveAddrs)
    },

    addReceiveAddr: function (req, res) {
        var props = req.body
        props['userid'] = req.user._doc._id
        AddressDb.create(props, function (err, result) {
            if (err) {
                console.log(err)
                res.json(new ResponseResult(0, '添加地址失败'))
            } else {
                console.log(result)
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
                console.log(err)
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
            console.log(result)
            if (result != null && result.nModified == 1) {
                res.json(new ResponseResult(1, "修改地址成功"));
            } else {
                res.json(new ResponseResult(0, '修改地址失败'));
            }
        })
    },

    getReceiveAddrs: function (req, res) {
        var userId = req.user._doc._id;
        console.log('getReceiveAddrs userId ' + userId)
        AddressDb.find({userid: userId}, function (err, result) {
            console.log(result)
            if (result != null) {
                res.json(new ResponseResult(1, "获取地址成功", result));
            } else {
                res.json(new ResponseResult(0, '获取地址失败'));
            }
        })
    }
}