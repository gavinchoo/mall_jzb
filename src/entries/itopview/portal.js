import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import Portal from '../../containers/itopview/portal'

ReactDom.render(
  (<Router>
        <Route component={Portal}/>
    </Router>
  )
  , document.getElementById('root')
)