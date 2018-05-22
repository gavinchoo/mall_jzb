import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import {HashRouter as Router, Route} from 'react-router-dom'
import Portal from './containers/portal'
import Store from './model'

ReactDom.render(
  (<Provider store={Store}>
        <Router>
            <Route component={Portal}/>
        </Router>
    </Provider>
  )
  , document.getElementById('rootpanel')
)