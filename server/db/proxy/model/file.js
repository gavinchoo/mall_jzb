var File = require('../../mongo/index').File

exports.getFile = function (fileid, callback) {
    if (!fileid || fileid.length == 0) {
        return callback(null, [])
    }
    File.findOne({'_id': fileid}, callback)
}

exports.createFile = function (file, callback) {
    File.create(file, callback)
}