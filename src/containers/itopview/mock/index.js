import img1 from './image/detail/01_01.jpg'
import img2 from './image/detail/01_02.jpg'
import img3 from './image/detail/01_03.jpg'

import img4 from './image/detail/03.jpg'
import img5 from './image/detail/04.jpg'
import img6 from './image/detail/05.jpg'

import imageCar1 from './image/car1.jpg'
import imageCar2 from './image/car2.jpg'

import imageCar3 from './image/car3.jpg'
import imageCar4 from './image/car4.jpg'
import imageCar5 from './image/car5.jpg'
import imageCar6 from './image/car6.jpg'

exports.detailData = {
    images: [img1,img2, img3, img4, img5, img6]
}

exports.carListData = {
    car_list: [{
        title: "斯巴鲁，全面购车节",
        image: imageCar3
    }, {
        title: "全新捷豹，畅想0利尽致",
        image: imageCar4
    }, {
        title: "雷克萨斯购车新风尚",
        image: imageCar5
    }, {
        title: "特斯拉，开启改变世界之旅",
        image: imageCar6
    },],
    car_slider: [{
        title: "凯迪拉克1",
        image: imageCar1
    }, {
        title: "凯迪拉克1",
        image: imageCar3
    }, {
        title: "凯迪拉克2",
        image: imageCar2
    }]
}

exports.progressData = {
    base: [{title: "姓名", value: "张三"},
        {title: "手机号码", value: "18188886666"},
        {title: "购车区域", value: "广东省  深圳市"},
        {title: "购车品牌", value: "斯巴鲁-斯巴鲁XV"},
        {title: "意向车型", value: "2.0i全驱精英版"},
        {title: "创建时间", value: "2018-01-25 14：23"}],

    type: [{title: "金融分期产品", value: "内部员工3年"},
        {title: "贷款金额", value: "￥180,000.00"},
        {title: "贷款比例", value: "54.98%"},
        {title: "首付金额", value: "￥147,400.00"},
        {title: "首付比例", value: "45.02%"},
        {title: "期数", value: "36"},
        {title: "还款方式", value: "等额本息"},
        {title: "分期月供", value: "￥5,424.00"}],

    carInfo: {
        brand: "斯巴鲁-斯巴鲁XV",
        type: "2.0i全驱精英版",
        money: "￥327,400.00",
    }
}

exports.repayHistoryData = [
    {
        year: "2018年",
        child: [
            {month: "1", time: "2017/12/08-2018/01/07", money: "￥5,424.00"},
        ]
    },
    {
        year: "2017年",
        child: [
            {month: "12", time: "2017/11/08-2017/12/07", money: "￥5,424.00"},
            {month: "11", time: "2017/10/08-2017/11/07", money: "￥5,424.00"},
            {month: "10", time: "2017/09/08-2017/10/07", money: "￥5,424.00"},
            {month: "9", time: "2017/08/08-2017/09/07", money: "￥5,424.00"},
            {month: "8", time: "2017/07/08-2017/08/07", money: "￥5,424.00"},
            {month: "7", time: "2017/06/08-2017/07/07", money: "￥5,424.00"},
            {month: "6", time: "2017/05/08-2017/06/07", money: "￥5,424.00"},
            {month: "5", time: "2017/04/08-2017/05/07", money: "￥5,424.00"},
            {month: "4", time: "2017/03/08-2017/04/07", money: "￥5,424.00"},
        ]
    }
]


