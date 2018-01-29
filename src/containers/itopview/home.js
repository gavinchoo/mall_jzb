import React from 'react'
import {Link, Route} from 'react-router-dom'
import {Toast, Button} from 'antd-mobile'
import 'antd-mobile/lib/button/style/css'
import 'antd-mobile/lib/toast/style/css'

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
                  <Button><Link to={router.carlist}>分期购车</Link></Button>
                  <Button><Link to={router.progress.replace(':status', 'query')}>进度查询</Link></Button>
                  <Button><Link to={router.repayment}>在线还款</Link></Button>
              </div>
              <div className="car_content">
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