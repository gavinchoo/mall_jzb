var {handleResponse, OperateType} = require('../../common/http/hander.response')
var {ResponseSuccess, ResponseError} = require('../../common/http/response.result')

var OptionPricesDb = require('../../db/mongo/index').OptionPrices
var OptionsDb = require('../../db/mongo/index').Options

module.exports = {
    init: function (app, auth) {
        app.post('/Options/addOptions', this.addOptions)
        app.post('/Options/queryOptions', this.queryOptions)
        app.post('/Options/updateOptions', this.updateOptions)
        app.post('/Options/removeOptions', this.removeOptions)
        
        app.post('/Options/addProductOption', this.addProductOption)
        app.post('/Options/addProductOptionPrices', this.addProductOptionPrices)
        app.post('/Options/queryProductOptionPrices', this.queryProductOptionPrices)
        app.post('/Options/removeProductOptionPrices', this.removeProductOptionPrices)
    },

    addOptions: function (req, res) {
        OptionsDb.create(req.body, function (err, result) {
            handleResponse(OperateType.Create, res, err, result)
        })
    },

    updateOptions: function (req, res) {
        var params = req.body.child ? {
            $addToSet: {child: {$each: req.body.child}}
        } : {$set: {title: req.body.title}}
        OptionsDb.update({pid: req.body.pid}, params, {runValidators: true}
          , function (err, result) {
              handleResponse(OperateType.Edit, res, err, result)
          })
    },

    queryOptions: function (req, res) {
        OptionsDb.find(function (err, result) {
            handleResponse(OperateType.Query, res, err, result)
        })
    },

    removeOptions: function (req, res) {
        var body = req.body
        if (body.child) {
            // 删除子项
            OptionsDb.update({_id: body._id}, {$pull: {child: {title: body.child.title}}}, function (err, result) {
                handleResponse(OperateType.Edit, res, err, result)
            })
        } else {
            // 全部删除
            OptionsDb.remove({_id: body._id}, function (err, result) {
                handleResponse(OperateType.Remove, res, err, result)
            })
        }
    },

    addProductOption: function (req, res) {
        OptionPricesDb.findOne({product_id: req.body.product_id}, function (err, result) {
            if (err) {
                res.json(new ResponseError("添加失败", err.message))
            } else {
                if (result) {
                    OptionPricesDb.update({product_id: req.body.product_id},
                      {$addToSet: {option: req.body.option}}, function (err, result) {
                          handleResponse(OperateType.Edit, res, err, result)
                      })
                } else {
                    OptionPricesDb.create(req.body, function (err, result) {
                        handleResponse(OperateType.Create, res, err, result)
                    })
                }
            }
        })
    },

    addProductOptionPrices: function (req, res) {
        OptionPricesDb.update({product_id: req.body.product_id},
          {$addToSet: {option_price: req.body.option_price}}, function (err, result) {
              handleResponse(OperateType.Edit, res, err, result)
          })
    },

    queryProductOptionPrices: function (req, res) {
        OptionPricesDb.find({product_id: req.body.product_id}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result)
        })
    },

    removeProductOptionPrices: function (req, res) {
        var body = req.body
        OptionPricesDb.remove({_id: body._id}, function (err, result) {
            handleResponse(OperateType.Remove, res, err, result)
        })
    },
}