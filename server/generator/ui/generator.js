var fs = require('fs')
var path = require('path')

var map = require('../map')
var util = require('../util')
var config = require('../config')

function processMap() {
    map.forEach((item) => {
        var columnTemplate = "{title: '@title', dataIndex: '@dataIndex',key: '@key', type: @type, width: @width, required: @required, f7: @f7, listshow:@listshow}"
        var uriTemplate = "query: '@query',\n    remove: '@remove',\n    edit: '@edit',\n    create: '@create'";

        // 构建数据源
        var columnsContent = "";
        item.columns.forEach((columnItem) => {

            if (columnItem.type == Array && columnItem.f7) {
                columnItem.f7.query = "/api/" + config.apiversion + "/" + columnItem.f7.table + "/query";
            }

            var newColumn = columnTemplate
              .replace("@title", columnItem.title)
              .replace("@dataIndex", columnItem.dataIndex)
              .replace("@key", columnItem.dataIndex)
              .replace(/@type/g, columnItem.type.name)
              .replace(/@f7/g, JSON.stringify(columnItem.f7))
              .replace("@required", columnItem.required)
              .replace("@listshow", columnItem.listshow)
              .replace("@width", columnItem.width ? columnItem.width : 150);

            columnsContent = columnsContent + "    " + newColumn + ",\n";
        })

        var api = "/api/" + config.apiversion + "/" + item.table;

        var uriContent = uriTemplate
          .replace(/@query/g, api + "/query")
          .replace(/@remove/g, api + "/remove")
          .replace(/@edit/g, api + "/edit")
          .replace(/@create/g, api + "/create")


        // // 创建文件目录
        var fileRootPath = path.join("./", config.uipath + item.group + "/");
        if (!fs.existsSync(fileRootPath)) {
            util.mkdirsSync(fileRootPath);
        }

        var mapPath = path.join("./", config.uipath + item.group + "/" + item.table + "map.js");
        var addPath = path.join("./", config.uipath + item.group + "/" + item.table + "add.js");
        var listPath = path.join("./", config.uipath + item.group + "/" + item.table + "list.js");

        var model = util.firstToUpperCase(item.table)

        // 构建页面详情、列表页面
        var addtemplate = fs.readFileSync("./server/generator/ui/addtemplate").toString();
        var listtemplate = fs.readFileSync("./server/generator/ui/listtemplate").toString();
        var maptemplate = fs.readFileSync("./server/generator/ui/maptemplate").toString();

        var mapcontent = maptemplate.replace(/{@Columns}/g, columnsContent).replace(/{@Uri}/g, uriContent);
        var addcontent = addtemplate.replace(/{@Title}/g, "Add" + model).replace(/{@map}/g, item.table + "map");
        var listcontent = listtemplate.replace(/{@Title}/g, "List" + model).replace(/{@map}/g, item.table + "map");

        // 已生成的接口需手动删除， 防止修改后被覆盖
        fs.writeFileSync(mapPath, mapcontent);
        fs.writeFileSync(addPath, addcontent);
        fs.writeFileSync(listPath, listcontent);

        // if (!fs.existsSync(fileFullPath)){
        //     fs.writeFileSync(fileFullPath, mapcontent);
        // }
    })
}

function readSchema(rootPath, subFolder) {
    try {
        var list = fs.readdirSync(rootPath)
        for (var i = 0; i < list.length; i++) {
            var state = fs.lstatSync(rootPath + "/" + list[i]);
            if (state.isDirectory()) {
                readSchema(rootPath + "/" + list[i], list[i]);
            } else {
                schemas.push({path: path.join("../../../" + rootPath, list[i]), name: list[i]});
            }
        }
    } catch (e) {
        console.error(e)
    }
}

// readSchema(PATH_SCHEMA);

processMap();