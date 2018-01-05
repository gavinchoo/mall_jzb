/*
* 账号相关接口
* */

var ResponseResult = require('../model/response.result')
var config = require('../config/token.config')
const jwt = require('jsonwebtoken');

var UserDb = require('../../db/mongo/index').User

function createToken (username) {
    var token = jwt.sign({name: username}, config.secret, {
        expiresIn: config.expiresIn
    });
    return token
}

module.exports = {
    init: function (app, auth) {
        app.post('/User/Accesstoken', this.getAccessToken)
        app.post('/User/Register', this.register)
        app.post('/User/Login', auth, this.login)
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
        new Promise(function (resolve, reject) {
            UserDb.findOne({'username': data.username}, function (err, result) {
                console.log(result)
                if (result == null || result == undefined) {
                    resolve()
                } else {
                    res.json(new ResponseResult(0, '账号已存在，不可重复创建'))
                }
            })

        }).then(function () {
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
                        var token = createToken(data.username)
                        res.json(new ResponseResult(1, '注册成功', {
                            token: 'Bearer ' + token,
                            name: data.username
                        }))
                    }
                }
            })
        })
    },

    getAccessToken: function (req, res) {
        var props = req.body

        new Promise(function (resolve, reject) {
            UserDb.findOne({username: props.username}, function (err, result) {
                if (err || result == null) {
                    res.json(new ResponseResult(0, '用户名不存在'));
                }else {
                    if (result.pwd == props.pwd){
                        resolve(result)
                    }else {
                        res.json(new ResponseResult(0, '密码错误'));
                    }
                }
            })
        }).then(function (result) {
            var username = result.username
            var token = createToken(username)
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
        })
    },
};
