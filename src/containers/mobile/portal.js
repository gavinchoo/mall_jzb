import React from 'react'
import {Grid, Toast} from 'antd-mobile'
import 'antd-mobile/lib/grid/style/css'
import 'antd-mobile/lib/toast/style/css'

import TitleBar from './common/titlebar'

export default class Portal extends React.Component {

    onItemClick = (el, index) => {
        if (index == 0) {
            document.location = "js://webview?openBundle=http://192.168.1.103:3000/mobile/personal";
        } else {
            Toast.info(index, 1, null, false)
            var win = window.open(el.url, '_parent');
            win.focus();
        }
    }

    render() {
        const data = Array.from(new Array(9)).map((_val, i) => ({
            icon: require('../images/favicon.png'),
            text: `人员信息管理`,
            url: 'personal'
        }));
        return (
          <div>
              <TitleBar title="首页"/>
              <Grid data={data} columnNum={4} onClick={this.onItemClick} activeStyle={true}/>
          </div>
        )
    }
}