/*
* 验证码相关接口
* */
var {ResponseSuccess, ResponseError} = require('../../common/http/response.result')
var UserDb = require('../../db/mongo/index').User

module.exports = {
    init: function (app, auth) {
        app.post('/Public/getCaptcha', this.getCaptcha)
        app.get('/Public/getCaptcha', this.getCaptcha)
    },

    getCaptcha: function (req, res) {
        var data = req.body
        if (data.type == "register") {
            UserDb.findOne({'username': data.username}, function (err, result) {
                if (result == null || result == undefined) {
                    res.json(new ResponseSuccess("发送成功", {verify: 1234}));
                } else {
                    res.json(new ResponseError('账号已存在，不可重复创建'))
                }
            })
        }
    }

}