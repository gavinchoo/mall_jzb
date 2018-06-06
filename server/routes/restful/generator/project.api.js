var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var DBHelper = require('../../../common/util/dbhelper')
var ProjectDb = require('../../../db/generator/index').Project

module.exports = {
    init: function (app, auth, apigroup) {
        app.post(apigroup + '/project/create', this.create);
        app.post(apigroup + '/project/edit', this.edit);
        app.route(apigroup + '/project/remove').all(this.remove);
        app.route(apigroup + '/project/query').all(this.query);
    },

    create: function (req, res) {
        ProjectDb.create(req.body, function (err, result) {
            handleResponse(OperateType.Create, res, err, result);
        })
    },

    edit: function (req, res) {
        ProjectDb.update({_id: req.body._id}, {$set: req.body}, function (err, result) {
            handleResponse(OperateType.Edit, res, err, result);
        })
    },

    remove: function (req, res) {
        var originalParams = req.method == "GET" ? req.query : req.body;
        ProjectDb.remove({_id: originalParams._id}, function (err, result) {
            handleResponse(OperateType.Remove, res, err, result);
        })
    },

    query: function (req, res) {
        var originalParams = req.method == "GET" ? req.query : req.body;
        var page = originalParams.page
        var pagesize = originalParams.pagesize
        var params = JSON.parse(JSON.stringify(originalParams))
        delete  params.page
        delete  params.pagesize
        DBHelper.pageQuery(page, pagesize, ProjectDb, '', params, {}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result);
        })
    }
}