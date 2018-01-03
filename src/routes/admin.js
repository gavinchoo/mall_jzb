import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from '../containers/admin/login'
import Home from '../containers/admin/home'

export default class App extends React.Component {
    previousLocation = this.props.location

    componentWillUpdate(nextProps) {
        console.log(nextProps)
        const {location} = this.props
        // set previousLocation if props.location is not modal
        if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location
        }
    }

    render() {
        const {location} = this.props
        const isModal = !!(
          location.state &&
          location.state.modal &&
          this.previousLocation !== location // not initial render
        )
        console.log('isModal : ' + isModal)
        console.log(this.previousLocation)
        return (
          <div>
              <Switch location={isModal ? this.previousLocation : location}>
                  <Route exact path="/" component={Login}/>
                  <Route path="/home" component={Home}/>
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