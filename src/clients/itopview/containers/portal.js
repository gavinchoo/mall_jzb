import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './home'

import 'antd-mobile/lib/button/style/css'
import 'antd-mobile/lib/toast/style/css'
import 'antd-mobile/lib/wing-blank/style/css'
import 'antd-mobile/lib/white-space/style/css'
import 'antd-mobile/lib/input-item/style/css'
import '../style/index.css'

import CarList from './carlist'
import Progress from './progress'
import RepayMent from './repayment'
import RepayHistory from './repayhistory'
import Detail from './detail'
import ApplyForOne from './applyfor1'
import ApplyForTwo from './applyfor2'

import router from './routers'

export default class App extends React.Component {
    render() {
        return (
          <div>
              <Switch >
                  <Route exact path="/" component={Home}/>
                  <Route path={router.carlist} component={CarList}/>
                  <Route path={router.progress} component={Progress}/>
                  <Route path={router.repayment} component={RepayMent}/>
                  <Route path={router.repayhistory} component={RepayHistory}/>
                  <Route path={router.applyforOne} component={ApplyForOne}/>
                  <Route path={router.applyforTwo} component={ApplyForTwo}/>
                  <Route path={router.detail} component={Detail}/>
                  <Route component={NoMatch}/>
              </Switch>
          </div>
        )
    }
}

const NoMatch = ({location}) => (
  <div>
      <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)