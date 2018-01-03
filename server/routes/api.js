var express = require('express');
var router = express.Router();
var fs = require('fs')

var FS_PATH_SERVICES = './server/routes/restful/';
var REQUIRE_PATH_SERVICES = './restful/';

router.options('*', function (req, res, next) {
    next();
});

try {
    var list = fs.readdirSync(FS_PATH_SERVICES)
    for (var i = 0; i < list.length ; i++){
        var service = require(REQUIRE_PATH_SERVICES + list[i])
        service.init && service.init(router)
    }
}catch (e){
    console.error(e)
}

module.exports = router