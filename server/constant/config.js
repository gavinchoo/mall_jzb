var path = require('path')
var { mkdirsSync } = require('../common/fileutils')

var config = {
    debug: true,
    db: 'mongodb://localhost:27017/mall_jzb',
    apilogDir: path.join(__dirname, '../../capture/logs/apilog'),
    serverlogDir: path.join(__dirname, '../../capture/logs/serverlog'),
    uploadDir: path.join(__dirname, '../../capture/uploads'),
    initCaptureDir: function () {
        // ensure log directory exists
        mkdirsSync(this.apilogDir)
        mkdirsSync(this.serverlogDir)
        mkdirsSync(this.uploadDir)
    }
}

module.exports = config