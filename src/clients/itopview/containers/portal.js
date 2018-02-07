import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './home'

import '../style/index.less'

export default class App extends React.Component {
    render() {
        return (
          <div>
              <Switch >
                  <Route path="/" component={Home}/>
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