var mongoose = require('mongoose');
var config = require('../../constant/config');
var logger = require('../../common/logger')

mongoose.connect(config.db);
/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    logger.info('Mongoose connection open to ' + config.db);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    logger.info('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose connection disconnected');
});

require('./schema/user/user')
require('./schema/address/address')
require('./schema/address/province')
require('./schema/address/city')
require('./schema/address/area')
require('./schema/user/order')
require('./schema/user/account')
require('./schema/file')

exports.User = mongoose.model('User');
exports.Account = mongoose.model('Account');
exports.Order = mongoose.model('Order')
exports.Address = mongoose.model('Address')
exports.Province = mongoose.model('Province')
exports.City = mongoose.model('City')
exports.Area = mongoose.model('Area')
exports.File = mongoose.model('File')

