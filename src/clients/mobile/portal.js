import React from 'react'
import ReactDom from 'react-dom'
import Portal from './containers/portal'

import {HashRouter as Router, Route} from 'react-router-dom'

ReactDom.render(
  (<Portal/>)
  , document.getElementById('root')
)