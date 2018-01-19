var {ResponseSuccess, ResponseError} = require('../../common/http/response.result')
var DBHelper = require('../../db/mongo/utils/dbhelper')

var CategoryDb = require('../../db/mongo/index').Category
var ProductDb = require('../../db/mongo/index').Product

module.exports = {
    init: function (app, auth) {
        app.post('/Product/addCategory', this.addCategory)
        app.post('/Product/queryCategory', this.queryCategory)
        app.post('/Product/addProduct', auth, this.addProduct)
        app.post('/Product/editProduct', auth, this.editProduct)
        app.post('/Product/removeProduct', auth, this.removeProduct)
        app.post('/Product/queryProductForPage', this.queryProductForPage)
    },

    addCategory: function (req, res) {
        CategoryDb.create(req.body, function (err, result) {
            if (err || result == null){
                res.json(new ResponseError("创建分类失败"))
            }else {
                res.json(new ResponseSuccess("创建分类成功", result))
            }
        })
    },

    queryCategory: function (req, res) {
        var pid = req.body.pid
        var params = pid ? {pid: pid} : {pid: null}
        CategoryDb.find(params, function (err, result) {
            if (err || result == null){
                res.json(new ResponseError("查询分类失败"))
            }else {
                res.json(new ResponseSuccess("查询分类成功", result))
            }
        })
    },

    addProduct: function (req, res) {
        ProductDb.create(req.body, function (err, result) {
            if (err || result == null){
                res.json(new ResponseError("创建商品失败"))
            }else {
                res.json(new ResponseSuccess("创建商品成功", result))
            }
        })
    },

    editProduct: function (req, res) {
        ProductDb.update({_id: req.body._id}, {$set: req.body}, function (err, result) {
            if (err || result == null || result.n == 0){
                res.json(new ResponseError(err ? err.message : "修改商品失败"))
            }else {
                res.json(new ResponseSuccess("修改商品成功"))
            }
        })
    },

    removeProduct: function (req, res) {
        ProductDb.remove({_id: req.body._id}, function (err, result) {
            if (err || result == null || result.result.n == 0){
                res.json(new ResponseError(err ? err.message: "删除商品失败"))
            }else {
                res.json(new ResponseSuccess("删除商品成功"))
            }
        })
    },

    queryProductForPage: function (req, res) {
        var page = req.body.page
        var pagesize = req.body.pagesize
        var params = JSON.parse(JSON.stringify(req.body))
        delete  params.page
        delete  params.pagesize
        console.log(params)
        DBHelper.pageQuery(page, pagesize, ProductDb, '', params, {}, function (err, result) {
            if (err || result == null){
                res.json(new ResponseError(err ? err.message : "查询商品失败"))
            }else {
                res.json(new ResponseSuccess("查询商品成功", result))
            }
        })
    }
}