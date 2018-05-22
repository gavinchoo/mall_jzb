export const Columns = [
    {title: "商品ID", dataIndex: "shop_id",key: "shop_id", type: String, required: true},
    {title: "产品名称", dataIndex: "title",key: "title", type: String, required: true, width:150},
    {title: "产品类型", dataIndex: "type",key: "type", type: Array, option: [{value: "1", title: "电器"}, {value: "2", title: "书籍"}]},
    {title: "原价", dataIndex: "price",key: "price", type: String, width:150},
    {title: "数量", dataIndex: "quantity",key: "quantity", type: String, width:150},
    {title: "创建时间", dataIndex: "create_time",key: "create_time", type: Date, width:150},
]

export const Uri = {
    query: "/api/v1/product/query",
    remove: "/api/v1/product/remove",
    edit: "/api/v1/product/edit",
    create: "/api/v1/product/create"
}