import React from 'react'
import {Link} from 'react-router-dom'
import {Modal} from 'antd-mobile'
import {Icon} from 'antd'
import 'antd-mobile/lib/grid/style/css'
import 'antd-mobile/lib/modal/style/css'

const alert = Modal.alert

import routers from './routers'

export default class Portal extends React.Component {

    constructor(props) {
        super(props)
        var name = "杨家乐"
        var applyInfo = localStorage.getItem("applyInfo")
        if (applyInfo) {
            name = JSON.parse(applyInfo).firstStepInfo.name
        }
        this.state = {
            name: name
        }
    }

    componentWillMount() {
        document.title = '在线还款'
    }

    handleRepay = () => {
        alert("提示", "微信支付对接中， 即将上线", [{text: '知道了'}])
    }

    render() {
        return (
          <div className='car_content'>
              <div className='car_repay_head_bg'>
                  <div className="car_repay_name">{this.state.name} 合同号：CS20180131</div>
                  <div style={{display: "flex", marginTop: "10px"}}>
                      <div style={{width: "75%", textAlign: "center"}}>
                          <div className="car_repay_money_title">剩余应还</div>
                          <div className="car_repay_money">￥5,424.00</div>
                      </div>
                      <div style={{}}>
                          <div className="car_repay_btn" onClick={this.handleRepay}>还款</div>
                      </div>
                  </div>

              </div>

              <div className="car_gray_line"/>
              <div className="car_repay_history_bg">
                  <div style={{display: 'flex'}}>
                      <div style={{textAlign: "center", marginLeft: "10px", marginTop: "5px"}}>
                          <Icon type="bars" style={{fontSize: 16}}/>
                      </div>
                      <div style={{width: "20%", marginLeft: "10px", marginTop: "3px"}}>未出账单</div>
                      <div style={{width: "30%", color: "#1E88E5", fontSize: "16px"}}>￥125,760.00</div>
                  </div>
              </div>

              <div className="car_gray_line"/>
              <div className="car_repay_history_bg">
                  <Link to={routers.repayhistory}>
                      <div style={{display: 'flex'}}>
                          <div style={{width: "10%", textAlign: "center"}}>
                              <Icon type="clock-circle-o" style={{fontSize: 16}}/>
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