var fs = require('fs')
var path = require('path')

const PATH_TEMPLATE = "./server/generator/api/template";
const PATH_SCHEMA = "./server/db/mongo/schema";
const PATH_API = "/routes/restful/v2/";

const postfix = ".api.js"
var schemas = [];

function firstToUpperCase(str){
    str = str.toLowerCase();
    var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
    return str.replace(reg,function(m){
        return m.toUpperCase()
    });
}

function processApi() {
    var template = fs.readFileSync(PATH_TEMPLATE).toString();
    schemas.forEach((item) =>{
        if (item.name.indexOf("child") == -1){
            var schemaName = item.name.replace(".js", "");
            var model = firstToUpperCase(schemaName);
            var subPath = schemaName.toLowerCase();
            var content = template.replace(/{@Model}/g, model).replace(/{@Path}/g, subPath);
            // 创建文件目录
            var fileRootPath = path.join(__dirname, "../.."  + PATH_API);
            if (!fs.existsSync(fileRootPath)){
                fs.mkdirSync(fileRootPath);
            }

            var fileFullPath = path.join(__dirname, "../.." + PATH_API + subPath + postfix);
            // 已生成的接口需手动删除， 防止修改后被覆盖
            if (!fs.existsSync(fileFullPath)){
                fs.writeFileSync(fileFullPath, content);
            }
        }
    })
}

function readSchema(rootPath, subFolder) {
    try {
        var list = fs.readdirSync(rootPath)
        for (var i = 0; i < list.length; i++) {
            var state = fs.lstatSync(rootPath+ "/"  + list[i]);
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

readSchema(PATH_SCHEMA);

processApi();