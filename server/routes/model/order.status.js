module.exports = {
    OrderStatus: {
        /** 待付款 */
        PAY: {Desc: "等待买家付款", Code: "0"},

        /** 待发货 */
        DELIVERY: {Desc: "等待卖家发货", Code: "1"},

        /** 待收货 */
        RECEIPT1: {Desc: "卖家发货到聚真宝", Code: "2"},

        RECEIPT2: {Desc: "聚真宝已收货，正在鉴定", Code: "3"},

        RECEIPT3: {Desc: "聚真宝已发货", Code: "4"},

        ENSURE: {Desc: "买家已确认收货 ", Code: "5"},

        REFUND: {Desc: "买家已申请退款", Code: "6"},

        COMPLETE: {Desc: "交易完成 ", Code: "7"},

        CLOSE: {Desc: "交易关闭 ", Code: "8"}
    },
};