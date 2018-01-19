var OrderStatus = {
    /** 待付款 */
    Pay: {Desc: "等待买家付款", Code: "Pay"},
    /** 待发货 */
    Delivery: {Desc: "等待卖家发货", Code: "Delivery"},
    /** 待收货 */
    Receipt1: {Desc: "卖家发货到聚真宝", Code: "Receipt1"},
    Receipt2: {Desc: "聚真宝已收货，正在鉴定", Code: "Receipt2"},
    Receipt3: {Desc: "聚真宝已发货", Code: "Receipt3"},
    Ensure: {Desc: "买家已确认收货 ", Code: "Ensure"},
    Refund: {Desc: "买家已申请退款", Code: "Refund"},
    Complete: {Desc: "交易完成 ", Code: "Complete"},
    Close: {Desc: "交易关闭 ", Code: "Close"}
}

module.exports = {
    OrderStatus: OrderStatus
};