var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var DBHelper = require('../../../common/util/dbhelper')
var ProductDb = require('../../../db/mongo/index').Product
var Base = require('../../base');
Base.setModel(ProductDb);

module.exports = {
    init: function (app, auth, apigroup) {
        app.post(apigroup + '/product/create', Base.create);
        app.post(apigroup + '/product/edit', auth, Base.edit);
        app.route(apigroup + '/product/remove').all(auth, Base.remove);
        app.route(apigroup + '/product/query').all(Base.query);
    },
}