var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var DBHelper = require('../../../common/util/dbhelper')

var CategoryDb = require('../../../db/mongo/index').Category
var Base = require('../../base');
Base.setModel(CategoryDb);

module.exports = {
    init: function (app, auth, apigroup) {
        app.post(apigroup + '/category/create', auth, Base.create)
        app.post(apigroup + '/category/remove', auth, Base.remove)
        app.post(apigroup + '/category/query', Base.query)
    },

    create: function (req, res) {
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

    remove: function (req, res) {
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

    query: function (req, res) {
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
}