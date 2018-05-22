import React from 'react'
import {Link} from 'react-router-dom'
import {WingBlank, WhiteSpace} from 'antd-mobile'
import fetch from 'isomorphic-fetch'

import router from './routers'

export default class Home extends React.Component {

    componentWillMount() {
        document.title = '汽车金融'
    }

    componentWillUpdate() {
        document.title = '汽车金融'
    }

    componentDidMount() {
        console.log("componentDidMount")
        mbos.eas.invokeScript({
            name:"checkPermission",
            param:['PsonCustomer_addNew'],
            success:function(data){
                mbos.ui.showInfo(data);
            },
            error:function(data){
                mbos.ui.showInfo("校验权限出错！");
            }
        })
    }

    render() {
        return (
          <div className="car_parent">
              <WingBlank>
                  <div style={{width: "100%"}}>
                      <WhiteSpace/>
                      <WhiteSpace/>
                      <Link to={router.carlist} className="car_home_item1">
                          <div className="border_round" style={{background: "#1E88E5", width: "100%"}}>分期购车</div>
                      </Link>
                      <WhiteSpace/>
                      <WhiteSpace/>
                      <Link to={router.progress.replace(':status', 'query')} className="car_home_item1">
                          <div className="border_round" style={{background: "#259B24", width: "100%"}}>进度查询</div>
                      </Link>
                      <WhiteSpace/>
                      <WhiteSpace/>
                      <Link to={router.repayment} className="car_home_item1">
                          <div className="border_round" style={{background: "#FF9800", width: "100%"}}>在线还款</div>
                      </Link>
                  </div>
              </WingBlank>
          </div>
        )
    }
}