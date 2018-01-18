var {handleResponse, OperateType} = require('../model/hander.response')
var {ResponseSuccess, ResponseError} = require('../model/response.result')
var {OrderStatus, getStatusByCode} = require('../model/order.status')

var OrderDb = require('../../db/mongo/index').Order
var CartDb = require('../../db/mongo/index').Cart

var cartToOrder = function (result, userId, address) {
    var orders = []
    result.map((item) => {
        var order = {
            user_id: userId,
            order_no: new Date().getTime(),
            shop_id: item.shop_id,
            shop_title: item.shop_title,
            im_account: "",
            buyer_status: OrderStatus.PAY.Code,
            buyer_status_text: OrderStatus.PAY.Desc,
            seller_status: OrderStatus.PAY.Code,
            seller_status_text: OrderStatus.PAY.Desc,
            total_price: item.total_price,
            address: address,
            products: item.products,
        }
        orders.push(order)
    })
    return orders
}

module.exports = {
    init: function (app, auth) {
        app.post('/Order/addOrder', auth, this.addOrder)
        app.post('/Order/getMyOrders', auth, this.getMyOrders)
        app.post('/Order/delOrder', auth, this.delOrder)
        app.post('/Order/editOrderStatus', auth, this.editOrderStatus)
    },

    addOrder: function (req, res) {
        var userId = (req.user && req.user._doc) ? req.user._doc._id : null;
        var cart_ids = req.body.cart_ids
        var address = req.body.address
        CartDb.find({_id: {$in: cart_ids}}, function (err, result) {
            if (err || result.length == 0) {
                res.json(new ResponseError(err ? err.message : "创建失败", result))
            } else {
                var orders = cartToOrder(result, userId, address)
                OrderDb.create(orders, function (err, result) {
                    handleResponse(OperateType.Add, res, err, result)
                })
            }
        })
    },

    getMyOrders: function (req, res) {
        OrderDb.find({user_id: req.user._doc._id}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result)
        })
    },

    delOrder: function (req, res) {
        OrderDb.remove({_id: req.body.order_id}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result)
        })
    },

    editOrderStatus: function (req, res) {
        var status = getStatusByCode(req.body.status)
        var params = {}
        params.buyer_status = status.Code;
        params.buyer_status_text = status.Desc;
        OrderDb.update({_id: req.body.order_id}, {$set: params}, function (err, result) {
            handleResponse(OperateType.Update, res, err, result)
        })
    }
}