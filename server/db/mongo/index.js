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

require('./schema/user')
require('./schema/address')
require('./schema/order')
require('./schema/account')
require('./schema/file')

exports.User = mongoose.model('User');
exports.Account = mongoose.model('Account');
exports.Order = mongoose.model('Order')
exports.Address = mongoose.model('Address')
exports.File = mongoose.model('File')

