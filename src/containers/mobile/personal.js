import React from 'react'
import {Button, Drawer, List} from 'antd-mobile'
import 'antd-mobile/lib/button/style/css'
import 'antd-mobile/lib/drawer/style/css'
import 'antd-mobile/lib/list/style/css'

import TitleBar from './common/titlebar'

export default class PersonalManage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            open: false,
        }
    }

    clickMe = () => {

    }

    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
    }

    render() {
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                                       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                                       multipleLine
                    >Category</List.Item>);
                }
                return (<List.Item key={index}
                                   thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >Category{index}</List.Item>);
            })}
        </List>);
        return (
          <div>
              <TitleBar onLeftClick={this.onOpenChange} type="ellipsis" title="人员管理"/>
              <Button onClick={this.clickMe}>点我11</Button>
              <Drawer
                className="my-drawer"
                style={{minHeight: document.documentElement.clientHeight}}
                enableDragHandle
                contentStyle={{color: '#A6A6A6', textAlign: 'center', paddingTop: 42}}
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
              >
                  Click upper-left corner
              </Drawer>
          </div>
        )
    }
}