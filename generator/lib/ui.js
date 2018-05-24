var fs = require('fs')
var path = require('path')

var map = require('../map')
var util = require('../util')
var config = require('../config')

const columnTemplate = "{title: '@title', dataIndex: '@dataIndex',key: '@key', type: @type, width: @width, required: @required, f7: @f7, listshow:@listshow}"
const uriTemplate = "query: '@query',\n    remove: '@remove',\n    edit: '@edit',\n    create: '@create'";

function createColumnsContent(mapItem) {
    var columnsContent = "";
    mapItem.columns.forEach((columnItem) => {

        if (columnItem.f7 && columnItem.f7.table) {
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
    return columnsContent;
}

function createUriContent(mapItem) {
    var api = "/api/" + config.apiversion + "/" + mapItem.table;
    var uriContent = uriTemplate
      .replace(/@query/g, api + "/query")
      .replace(/@remove/g, api + "/remove")
      .replace(/@edit/g, api + "/edit")
      .replace(/@create/g, api + "/create")
    return uriContent;
}

function processUi() {
    map.forEach((mapItem) => {
        // 构建数据源
        var columnsContent = createColumnsContent(mapItem);
        var uriContent = createUriContent(mapItem);

        // // 创建文件目录
        var fileRootPath = path.join("./", config.uipath + mapItem.group + "/");
        if (!fs.existsSync(fileRootPath)) {
            util.mkdirsSync(fileRootPath);
        }

        var mapPath = path.join("./", config.uipath + mapItem.group + "/" + mapItem.table + "map.js");
        var addPath = path.join("./", config.uipath + mapItem.group + "/" + mapItem.table + "add.js");
        var listPath = path.join("./", config.uipath + mapItem.group + "/" + mapItem.table + "list.js");

        var model = util.firstToUpperCase(mapItem.table)

        // 构建页面详情、列表页面
        var addtemplate = fs.readFileSync(path.join(__dirname, "../template/addtemplate")).toString();
        var listtemplate = fs.readFileSync(path.join(__dirname, "../template/listtemplate")).toString();
        var maptemplate = fs.readFileSync(path.join(__dirname, "../template/maptemplate")).toString();

        var addcontent = addtemplate.replace(/{@Title}/g, "Add" + model).replace(/{@map}/g, mapItem.table + "map");
        var listcontent = listtemplate.replace(/{@Title}/g, "List" + model).replace(/{@map}/g, mapItem.table + "map");
        var mapcontent = maptemplate.replace(/{@Columns}/g, columnsContent).replace(/{@Uri}/g, uriContent);

        // 已生成的接口需手动删除， 防止修改后被覆盖
        if (!fs.existsSync(mapPath)) {
            fs.writeFileSync(mapPath, mapcontent);
        }

        if (!fs.existsSync(addPath)) {
            fs.writeFileSync(addPath, addcontent);
        }

        if (!fs.existsSync(listPath)) {
            fs.writeFileSync(listPath, listcontent);
        }
    })
}

module.exports = {
    processUi: processUi
}