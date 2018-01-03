import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import Admin from '../../routes/admin'

ReactDom.render(
  (<Router>
        <Route component={Admin}/>
    </Router>
  )
  , document.getElementById('root')
)