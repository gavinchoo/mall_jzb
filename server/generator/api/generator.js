var fs = require('fs')
var path = require('path')
var config = require('../config')
const PATH_TEMPLATE = "./server/generator/api/template";
const PATH_API = "/routes/restful/" + config.apiversion;
var map = require('../map')
const postfix = ".api.js"

var util = require('../util')

function processApi() {
    var template = fs.readFileSync(PATH_TEMPLATE).toString();
    map.forEach((item) => {
        if (item.table.indexOf("child") == -1) {
            var schemaName = item.table;
            var model = util.firstToUpperCase(schemaName);
            var subPath = schemaName.toLowerCase();
            var content = template.replace(/{@Model}/g, model).replace(/{@Path}/g, subPath);
            // 创建文件目录
            var fileRootPath = path.join(__dirname, "../.." + PATH_API);
            if (!fs.existsSync(fileRootPath)) {
                fs.mkdirSync(fileRootPath);
            }

            var fileFullPath = path.join(__dirname, "../.." + PATH_API + "/" + subPath + postfix);
            // 已生成的接口需手动删除， 防止修改后被覆盖
            if (!fs.existsSync(fileFullPath)) {
                fs.writeFileSync(fileFullPath, content);
            }
        }
    })
}

function readSchema(rootPath, subFolder) {
    try {
        var list = fs.readdirSync(rootPath)
        for (let i = 0; i < list.length; i++) {
            var state = fs.lstatSync(rootPath + "/" + list[i]);
            if (state.isDirectory()) {
                readSchema(rootPath + "/" + list[i], list[i]);
            } else {
                schemas.push({path: rootPath + "/" + list[i], name: list[i]});
            }
        }
    } catch (e) {
        console.error(e)
    }
}

processApi();