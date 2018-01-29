import React from 'react'
import {Link} from 'react-router-dom'
import {Toast} from 'antd-mobile'
import {Row, Col, Icon} from 'antd'
import 'antd-mobile/lib/grid/style/css'
import 'antd-mobile/lib/toast/style/css'

import routers from './routers'

export default class Portal extends React.Component {

    componentWillMount() {
        document.title = '在线还款'
    }

    render() {
        return (
          <div className='car_content'>
              <div className='car_repay_head_bg'>
                  <div className="car_repay_name">杨家乐 合同号：CS20180810</div>
                  <div style={{display: "flex", marginTop: "10px"}}>
                      <div style={{width: "75%", textAlign: "center"}}>
                          <div className="car_repay_money_title">剩余应还</div>
                          <div style={{fontSize: "28px", color: "white", textAlign: 'center'}}>
                              ￥2490.00
                          </div>
                      </div>
                      <div style={{}}>
                          <div className="car_repay_btn">还款</div>
                      </div>
                  </div>

              </div>
              <div className="car_gray_line"/>
              <div className="car_repay_history_bg">
                  <Link to={routers.repayhistory}>
                      <div style={{display: 'flex'}}>
                          <div style={{width: "10%", textAlign: "center"}}>
                              <Icon type="clock-circle-o"/>
                          </div>
                          <div style={{width: "80%"}}>历史账单</div>
                          <div style={{width: "10%"}}><Icon type="right"/></div>
                      </div>
                  </Link>
              </div>
              <div className="car_gray_line"/>
          </div>
        )
    }
}