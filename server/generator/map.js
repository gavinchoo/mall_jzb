/**
 *  规则定义：
 *  1. table:    数据库表名。
 *  2. group:    生成的代码数据分组，相同分组的代码会创建在同一个文件夹下。
 *  3. columns:  字段集合。
 *  4. required：标记为true的字段必须输入，值不能为空。
 *  5. listshow：是否在列表页面显示。
 *  6. width：   列表项显示宽度。
 *  6. type：    数据类型，
 *               1）当为Array类型时， 会解析为查询数据源。
 *               此时f7:   查询数据源，{table， group, columns, show} = {表名，表分组，查询列表显示的字段，选择后显示的字段}
 *               2）当为Object 类型时， 会解析为文档附件数据。
 *               此时f7:  {upload, download} = {文件上传地址，文件下载地址}
 */
const map = [
    {
        table: "product",
        group: "product",
        columns: [
            {title: "商店编号", dataIndex: "shop_id", type: String, required: true, listshow: true},
            {title: "产品名称", dataIndex: "title", type: String, required: true, width: 150, listshow: true},
            {
                title: "产品类型",
                dataIndex: "type",
                type: Array,
                // 1. [...] 数组说明是静态列表数据， 直接下拉选择。
                // 2. {...} 对象类型说明是查询数据， 查询后弹框显示。
                f7: {
                    table: "category", group: "product", columns: [
                        {title: "编号", dataIndex: "_id", key: "_id", type: String, required: true, width: 60},
                        {title: "分类名称", dataIndex: "title", key: "title", type: String, required: true, width: 60},
                    ], show: "title"
                }
                , listshow: true
            },
            {title: "原价", dataIndex: "price", type: String, width: 150, listshow: true},
            {title: "数量", dataIndex: "quantity", type: String, width: 150, listshow: true},
            {title: "创建时间", dataIndex: "create_time", type: Date, width: 200, listshow: true},
            {
                title: "视频",
                dataIndex: "movie",
                type: Object,
                width: 150,
                f7: {upload: "/api/file/upload", download: "/api/file/download", remove: "/api/file/remove"}
            },
        ]
    },
    {
        table: "category",
        group: "product",
        columns: [
            {title: "父级编号", dataIndex: "pid", type: String, required: true},
            {title: "分类名称", dataIndex: "title", type: String, required: true},
            {title: "图标", dataIndex: "image", type: String, required: true},
            {title: "排序", dataIndex: "sort", type: String, required: true},
            {title: "下级分类", dataIndex: "child", type: Array, required: true},
        ]
    },
    {
        table: "file",
        group: "file",
        columns: [
            {title: "创建人", dataIndex: "userid", type: String, required: true},
            {title: "文件名", dataIndex: "filename", type: String, required: true},
            {title: "文件后缀", dataIndex: "ext", type: String, required: true},
            {title: "文件路径", dataIndex: "path", type: String, required: true},
            {title: "文件大小", dataIndex: "size", type: Number, required: true},
            {title: "原名", dataIndex: "originalname", type: String},
            {title: "类型", dataIndex: "mimetype", type: String}
        ]
    }
]

module.exports = map