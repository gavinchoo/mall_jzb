import React from 'react'
import ReactDom from 'react-dom'
import PersonalManage from '../../containers/mobile/personal'

import {HashRouter as Router, Route} from 'react-router-dom'

ReactDom.render(
  (<PersonalManage/>
  )
  , document.getElementById('root')
)