import React from 'react'
import {NavBar, Icon} from 'antd-mobile'
import 'antd-mobile/lib/nav-bar/style/css'
import 'antd-mobile/lib/icon/style/css'

export default class TitleBar extends React.Component {

    constructor(props) {
        super(props)
    }

    onClickBack = () => {
        window.history.back()
    }

    render() {
        return (
          <NavBar mode='dark'
                  onLeftClick={this.props.onLeftClick == undefined ? this.onClickBack : this.props.onLeftClick}
                  style={{height: 55}}
                  icon={<Icon
                    type={this.props.type == undefined ? "left" : this.props.type}/>}>{this.props.title}</NavBar>)
    }
}