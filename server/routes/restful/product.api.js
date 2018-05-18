var {ResponseSuccess, ResponseError} = require('../../common/http/response.result')
var {handleResponse, OperateType} = require('../../common/http/hander.response')
var DBHelper = require('../../common/util/dbhelper')

var CategoryDb = require('../../db/mongo/index').Category
var ProductDb = require('../../db/mongo/index').Product

module.exports = {
    init: function (app, auth) {
        app.post('/Product/addCategory', this.addCategory)
        app.post('/Product/delCategory', this.delCategory)
        app.post('/Product/queryCategory', this.queryCategory)

        app.post('/Product/addProduct', this.addProduct)
        app.post('/Product/editProduct', this.editProduct)
        app.post('/Product/removeProduct', this.removeProduct)
        app.post('/Product/queryProduct', this.queryProductForPage)
    },

    addCategory: function (req, res) {
        if (req.body.child){
            req.body.child['pid'] = req.body.pid;
            CategoryDb.update({_id : req.body.pid}, {$push: {child: req.body.child}}, function (err, result) {
                handleResponse(OperateType.Edit, res, err, result)
            })
        }else {
            CategoryDb.create(req.body, function (err, result) {
                handleResponse(OperateType.Create, res, err, result)
            })
        }
    },

    delCategory: function (req, res) {
        var body = req.body
        if (body.child) {
            // 删除子项
            CategoryDb.update({_id: body.pid}, {$pull: {child: {title: body.child.title}}}, function (err, result) {
                handleResponse(OperateType.Edit, res, err, result)
            })
        } else {
            // 全部删除
            CategoryDb.remove({_id: body._id}, function (err, result) {
                handleResponse(OperateType.Remove, res, err, result)
            })
        }
    },

    queryCategory: function (req, res) {
        var page = req.body.page
        var pagesize = req.body.pagesize
        var params = JSON.parse(JSON.stringify(req.body))
        delete  params.page
        delete  params.pagesize
        console.log(params)
        DBHelper.pageQuery(page, pagesize, CategoryDb, '', params, {}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result);
        })
    },

    addProduct: function (req, res) {
        ProductDb.create(req.body, function (err, result) {
            handleResponse(OperateType.Create, res, err, result);
        })
    },

    editProduct: function (req, res) {
        ProductDb.update({_id: req.body._id}, {$set: req.body}, function (err, result) {
            handleResponse(OperateType.Edit, res, err, result);
        })
    },

    removeProduct: function (req, res) {
        ProductDb.remove({_id: req.body._id}, function (err, result) {
            handleResponse(OperateType.Remove, res, err, result);
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
            handleResponse(OperateType.Query, res, err, result);
        })
    }
}