import img1 from './image/detail/01.jpg'
import img3 from './image/detail/03.jpg'
import img4 from './image/detail/04.jpg'
import img5 from './image/detail/05.jpg'

import imageCar1 from './image/car1.jpg'
import imageCar2 from './image/car2.jpg'

exports.detailData = {
    images: [img1, img3, img4, img5]
}

exports.carListData = {
    car_list: [{
        title: "凯迪拉克1",
        image: imageCar1
    }, {
        title: "凯迪拉克2",
        image: imageCar2
    }, {
        title: "凯迪拉克1",
        image: imageCar1
    }, {
        title: "凯迪拉克2",
        image: imageCar2
    }]
}

exports.progressData = {
    base: [{title: "姓名", value: "张三"},
        {title: "手机号码", value: "18188886666"},
        {title: "购车区域", value: "广东省  深圳市"},
        {title: "购车品牌", value: "凯迪拉克-凯迪拉克XT5"},
        {title: "意向车型", value: "2018款 25T 豪华型"},
        {title: "创建时间", value: "2018-01-25 14：23"}],

    type: [{title: "金融分期产品", value: "内部员工3年"},
        {title: "贷款金额", value: "￥180,000.00"},
        {title: "贷款比例", value: "54.98%"},
        {title: "首付金额", value: "￥147,400.00"},
        {title: "首付比例", value: "45.02%"},
        {title: "期数", value: "36"},
        {title: "还款方式", value: "等额本息"},
        {title: "分期月供", value: "￥5,424.00"}]
}

exports.repayHistoryData = [
    {
        year: "2018年",
        child: [
            {month: "1", time: "2017/12/08-2018/01/07", money: "￥2490"},
        ]
    },
    {
        year: "2017年",
        child: [
            {month: "12", time: "2017/11/08-2017/12/07", money: "￥2490"},
            {month: "11", time: "2017/10/08-2017/11/07", money: "￥2485"},
            {month: "10", time: "2017/09/08-2017/10/07", money: "￥2490"},
            {month: "9", time: "2017/08/08-2017/09/07", money: "￥2432"},
            {month: "8", time: "2017/07/08-2017/08/07", money: "￥2490"},
            {month: "7", time: "2017/06/08-2017/07/07", money: "￥2490"},
            {month: "6", time: "2017/05/08-2017/06/07", money: "￥2493"},
            {month: "5", time: "2017/04/08-2017/05/07", money: "￥2490"},
            {month: "4", time: "2017/03/08-2017/04/07", money: "￥2490"},
        ]
    }
]


