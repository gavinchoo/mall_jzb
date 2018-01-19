var {handleResponse, OperateType} = require('../../common/http/hander.response')
var {ResponseSuccess, ResponseError} = require('../../common/http/response.result')

var ShopDb = require('../../db/mongo/index').Shop

module.exports = {
    init: function (app, auth) {
        app.post('/Shop/createShop', auth, this.createShop)
        app.post('/Shop/editShop', auth, this.editShop)
    },

    createShop: function (req, res) {
        if (req.body.title && req.body.title.length > 0) {
            var userId = req.user._doc._id;
            ShopDb.findOne({user_id: userId}, function (err, result) {
                if (result) {
                    res.json(new ResponseError("您已创建店铺，不能重复创建"))
                } else {
                    var params = req.body
                    params.user_id = userId
                    ShopDb.create(params, function (err, result) {
                        handleResponse(OperateType.Add, res, err, result)
                    })
                }
            })
        } else {
            res.json(new ResponseError("请填写店铺名称"))
        }
    },

    editShop: function (req, res) {
        if (req.body.headpic) {
            req.body.headpic = "/Api/File/downloadPicture?avatar_id=" + req.body.headpic
        }
        if (req.body.signpic) {
            req.body.signpic = "/Api/File/downloadPicture?avatar_id=" + req.body.signpic
        }
        req.body.update_time = Date.now()
        ShopDb.update({_id: req.body.shop_id}, {$set: req.body}, function (err, result) {
            handleResponse(OperateType.Update, res, err, result)
        })
    }
}