var {handleResponse, OperateType} = require('../../common/http/hander.response')
var {ResponseSuccess, ResponseError} = require('../../common/http/response.result')

var CartDb = require('../../db/mongo/index').Cart

module.exports = {
    init: function (app, auth) {
        app.post('/Cart/addTocart', this.addTocart)
        app.post('/Cart/editCart', this.editCart)
        app.post('/Cart/delCartbyId', this.delCartbyId)
        app.post('/Cart/queryCarts', this.queryCarts)
    },

    addTocart: function (req, res) {
        var params = req.body
        if (req.user) {
            var userId = req.user._doc._id;
            params.user_id = userId
        }
        var queryParams = {shop_id: req.body.shop_id, imei: req.body.imei};
        CartDb.findOne(queryParams, function (err, result) {
            if (err) {
                res.json(new ResponseError(err.message))
            } else {
                if (result) {
                    CartDb.update(queryParams, {$addToSet: {products: {$each: req.body.products}}}, function (err, result) {
                        handleResponse(OperateType.Update, res, err, result)
                    })
                } else {
                    CartDb.create(req.body, function (err, result) {
                        handleResponse(OperateType.Add, res, err, result)
                    })
                }
            }
        })
    },

    editCart: function (req, res) {
        var params = {}
        if (req.body.price) {
            params["products.$.price"] = req.body.price
        }
        if (req.body.quantity) {
            params["products.$.quantity"] = req.body.quantity
        }
        if (req.body.option_ids) {
            params["products.$.option_ids"] = req.body.option_ids
        }
        CartDb.update({
            "_id": req.body._id,
            "products._id": req.body.product_id
        }, {$set: params}, function (err, result) {
            handleResponse(OperateType.Update, res, err, result)
        })
    },

    delCartbyId: function (req, res) {
        CartDb.remove({_id: req.body._id}, function (err, result) {
            handleResponse(OperateType.Del, res, err, result)
        })
    },

    queryCarts: function (req, res) {
        var params = {}
        if (req.user) {
            var userId = req.user._doc._id;
            params.user_id = userId
        } else if (req.body.imei) {
            params.imei = req.body.imei
        } else {
            res.json(new ResponseSuccess("获取成功", []))
            return
        }
        console.log(params)
        CartDb.find(params, {imei: 0}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result)
        })
    }
}