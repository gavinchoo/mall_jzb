var User = require('../../mongo/index').User
var Account = require('../../mongo/index').Account
exports.getUserByLoginName = function (loginName, callback) {
    if (!loginName || loginName.length == 0) {
        return callback(null, [])
    }
    User.findOne({'username': loginName}, callback)
}

exports.createUser = function (user, callback) {
    User.create(user, function (err, result) {
        if (err || result == null){
            return callback(null, [])
        }else {
            Account.create({'userid': result._id})
            callback(result)
        }
    })
}

exports.updateToken = function (username, token, callback) {
    User.update({'username': username}, {'$set': {'token': token}}, callback)
}