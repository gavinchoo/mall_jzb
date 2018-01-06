var User = require('../../mongo/index').User

exports.getUserByLoginName = function (loginName, callback) {
    if (!loginName || loginName.length == 0) {
        return callback(null, [])
    }
    User.findOne({'username': loginName}, callback)
}

exports.createUser = function (user, callback) {
    User.create(user, callback)
}

exports.updateToken = function (username, token, callback) {
    User.update({'username': username}, {'$set': {'token': token}}, callback)
}