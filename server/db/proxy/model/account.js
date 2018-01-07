var Account = require('../../mongo/index').Account

exports.editAvatar = function (userid, avatar_url, callback) {
    if (!userid || userid.length == 0) {
        return callback(null, [])
    }
    Account.update({'userid': userid}, {'$set': {avatar_url: avatar_url}}, callback)
}

exports.editNickname = function (userid, nickname, callback) {
    if (!userid || userid.length == 0) {
        return callback(null, [])
    }
    Account.update({'userid': userid}, {'$set': {nickname: nickname}}, callback)
}

exports.editSex = function (userid, sex, callback) {
    if (!userid || userid.length == 0) {
        return callback(null, [])
    }
    Account.update({'userid': userid}, {'$set': {sex: sex}}, callback)
}

exports.getAccountInfo = function (userid, callback) {
    if (!userid || userid.length == 0) {
        return callback(null, [])
    }
    Account.findOne({'userid': userid}, callback)
}