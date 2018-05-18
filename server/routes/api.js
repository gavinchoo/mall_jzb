var express = require('express');
var router = express.Router();
var fs = require('fs')

var passport = require('passport')
var authenticator = passport.authenticate('bearer', {session: false})

var FS_PATH_SERVICES = './server/routes/restful/';
var REQUIRE_PATH_SERVICES = './restful/';


router.options('*', function (req, res, next) {
    next();
});

initRouters(FS_PATH_SERVICES, "");

function initRouters(rootPath, group) {
    try {
        var list = fs.readdirSync(rootPath)
        for (var i = 0; i < list.length; i++) {
            var state = fs.lstatSync(rootPath + list[i]);
            if (state.isDirectory()) {
                initRouters(rootPath + list[i] + "/", list[i]);
            } else {
                var service = require(REQUIRE_PATH_SERVICES + group + "/" + list[i])
                service.init && service.init(router, authenticator, "/" + group)
            }
        }
    } catch (e) {
        console.error(e)
    }
}

module.exports = router