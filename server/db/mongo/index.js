var mongoose = require('mongoose');
var config = require('../../constant/config');
var logger = require('../../common/util/logger')

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
mongoose.connection.on('error', function (err) {
    logger.info('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose connection disconnected');
});

/**
 * 用户
 */
exports.User = mongoose.model('User', require('./schema/user/user'));
exports.Account = mongoose.model('Account', require('./schema/user/account'));
exports.Wallet = mongoose.model('Wallet', require('./schema/pay/wallet'));
exports.WalletRecord = mongoose.model('WalletRecord', require('./schema/pay/walletrecord'));

/**
 * 地址
 */
exports.Address = mongoose.model('Address', require('./schema/address/address'))
exports.Province = mongoose.model('Province', require('./schema/address/province'))
exports.City = mongoose.model('City', require('./schema/address/city'))
exports.Area = mongoose.model('Area', require('./schema/address/area'))
exports.File = mongoose.model('File', require('./schema/file'))

/**
 * 商品
 */
exports.Category = mongoose.model('Category', require('./schema/product/category'))
exports.Product = mongoose.model('Product', require('./schema/product/product'))
exports.Options = mongoose.model('Options', require('./schema/product/options'))
exports.OptionPrices = mongoose.model('OptionPrices', require('./schema/product/optionprice'))

/**
 * 购物车
 */
exports.Cart = mongoose.model('Cart', require('./schema/cart/cart'))

/**
 * 订单
 */
exports.Order = mongoose.model('Order', require('./schema/order/order'))

/**
 * 我的店铺
 */
exports.Shop = mongoose.model('Shop', require('./schema/shop/shop'))