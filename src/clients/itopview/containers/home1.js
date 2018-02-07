import React from 'react'
import {WingBlank, WhiteSpace} from 'antd-mobile'
import 'antd-mobile/lib/wing-blank/style/css'
import 'antd-mobile/lib/white-space/style/css'

import '../style/home.less'
import router from './routers'

export default class Home extends React.Component {

    componentWillMount() {
        document.title = '汽车金融'
    }

    componentWillUpdate() {
        document.title = '汽车金融'
    }

    handleItemClick = (router) => {
        var win = window.open("portal#" + router, '_parent');
        win.focus();
    }

    render() {
        return (
          <div className="car_parent">
              <WingBlank>
                  <div style={{width: "100%"}}>
                      <WhiteSpace/>
                      <WhiteSpace/>
                      <div className="car_home_item1" onClick={e => this.handleItemClick(router.carlist)}>
                          <div className="border_round" style={{background: "#1E88E5", width: "100%"}}>分期购车</div>
                      </div>
                      <WhiteSpace/>
                      <WhiteSpace/>
                      <div className="car_home_item1" onClick={e => this.handleItemClick(router.progress)}>
                          <div className="border_round" style={{background: "#259B24", width: "100%"}}>进度查询</div>
                      </div>
                      <WhiteSpace/>
                      <WhiteSpace/>
                      <div className="car_home_item1" onClick={e => this.handleItemClick(router.repayment)}>
                          <div className="border_round" style={{background: "#FF9800", width: "100%"}}>在线还款</div>
                      </div>
                  </div>
              </WingBlank>
          </div>
        )
    }
}