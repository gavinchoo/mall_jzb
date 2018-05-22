var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var DBHelper = require('../../../common/util/dbhelper')
var ProductDb = require('../../../db/mongo/index').Product
var Base = require('../../base');
var base = new Base(ProductDb);

module.exports = {
    init: function (app, auth, apigroup) {
        app.post(apigroup + '/product/create', base.create);
        app.post(apigroup + '/product/edit', base.edit);
        app.route(apigroup + '/product/remove').all(base.remove);
        app.route(apigroup + '/product/query').all(base.query);
    },
}