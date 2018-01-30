import React from 'react'
import {Link, Route} from 'react-router-dom'
import {Toast, Button, WingBlank, WhiteSpace} from 'antd-mobile'
import 'antd-mobile/lib/button/style/css'
import 'antd-mobile/lib/toast/style/css'
import 'antd-mobile/lib/wing-blank/style/css'
import 'antd-mobile/lib/white-space/style/css'

import CarList from './carlist'
import Progress from './progress'
import RepayMent from './repayment'
import RepayHistory from './repayhistory'
import Detail from './detail'
import ApplyForOne from './applyfor1'
import ApplyForTwo from './applyfor2'


import router from './routers'

export default class Portal extends React.Component {

    componentWillMount() {
        document.title = '汽车金融'
    }

    render() {
        return (
          <div className="car_parent">
              <div className="car_content">
                  <WingBlank>
                      <div style={{display: 'flex', width: "100%"}}>
                          <Link to={router.carlist} className="car_home_item_left">
                              <div className="border_round" style={{background: "#1E88E5", width: "100%"}}>分期购车</div>
                          </Link>
                          <Link to={router.progress.replace(':status', 'query')} className="car_home_item_right">
                              <div className="border_round" style={{background: "#259B24", width: "100%"}}>进度查询</div>
                          </Link>
                      </div>
                      <div style={{display: 'flex', width: "100%"}}>
                          <Link to={router.repayment} className="car_home_item_left">
                              <div className="border_round" style={{background: "#FF9800", width: "100%"}}>在线还款</div>
                          </Link>
                          <div className="car_home_item_right" style={{background: "#FFFFFF"}}></div>
                      </div>
                  </WingBlank>

              </div>
              <div>
                  <Route path={router.carlist} component={CarList}/>
                  <Route path={router.progress} component={Progress}/>
                  <Route path={router.repayment} component={RepayMent}/>
                  <Route path={router.repayhistory} component={RepayHistory}/>
                  <Route path={router.applyforOne} component={ApplyForOne}/>
                  <Route path={router.applyforTwo} component={ApplyForTwo}/>
                  <Route path={router.detail} component={Detail}/>
              </div>
          </div>
        )
    }
}