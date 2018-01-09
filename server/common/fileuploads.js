var multer = require('multer')
var path = require('path')
var config = require('../../constant/config')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../" + config.upload_dir))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var multer = multer({ storage: storage })
var upload = multer.single('file')

//导出对象
module.exports = upload;