/*
* 账号相关接口
* */

var ResponseResult = require('../model/response.result')
var config = require('../config/token.config')
const jwt = require('jsonwebtoken');
var passport = require('passport')

var UserDb = require('../../db/mongo/schema/user.schema')

module.exports = {
    init: function (app) {
        app.post('/User/Accesstoken', this.getAccessToken)
        app.post('/User/Register', this.register)
        app.post('/User/Login', passport.authenticate('local'), this.login)
    },

    login: function (req, res) {
        console.log(req)
        if (req.user.username) {
            res.json(new ResponseResult(1, "登录成功"))
        } else {
            res.json(new ResponseResult(0, "登录失败"))
        }
    },

    register: function (req, res) {
        var data = req.body
        data['createtime'] = new Date()
        UserDb.findOne({'username': data.username}, function (err, result) {
            console.log(result)
            if (result == null || result == undefined) {
                UserDb.create(data, function (err, result) {
                    if (err) {
                        console.log(err)
                        res.json(new ResponseResult(0, '注册失败'))
                    } else {
                        console.log(result)
                        if (result == null) {
                            res.json(new ResponseResult(0, '注册失败'))
                        }
                        else {
                            res.json(new ResponseResult(1, '注册成功'))
                        }
                    }
                })
            } else {
                res.json(new ResponseResult(0, '账号已存在，不可重复创建'))
            }
        })
    },

    getAccessToken: function (req, res) {
        var props = req.body
        UserDb.findOne({username: props.username, pwd: props.pwd}, function (err, result) {
            if (err || result == null) {
                res.json({status: 10, message: 'Incorrect username or password.'});
            } else {
                var username = result.username
                var token = jwt.sign({name: username}, config.secret, {
                    expiresIn: config.expiresIn
                });

                UserDb.update({'username': username}, {'$set': {'token': token}}, function (err, result) {
                    console.log(result)
                    if (result != null && result.nModified == 1) {
                        res.json(new ResponseResult(1, "认证成功", {
                            token: 'Bearer ' + token,
                            name: username
                        }));
                    } else {
                        res.json(new ResponseResult(0, '认证失败,用户不存在!'));
                    }
                })
            }
        })
    }
};
