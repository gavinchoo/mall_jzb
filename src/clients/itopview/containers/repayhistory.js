import React from 'react'
import {Icon} from 'antd'

import {repayHistoryData} from '../mock/index'

class ItemView extends React.Component {

    render() {
        var itemList = []
        this.props.itemInfo.child.forEach((item) => {
            itemList.push((
              <div>
                  <div className="car_vertical_center" style={{height: "55px", background: "#FFFFFF"}}>
                      <div style={{display: 'flex'}}>
                          <div style={{width: "75%", paddingLeft: "30px"}}>
                              <div style={{fontSize: "14px"}}>{item.month}月账单</div>
                              <div style={{fontSize: "12px"}}>{item.time}</div>
                          </div>
                          <div style={{marginTop: "6px", fontSize: "16px"}}>{item.money}</div>
                          <div style={{marginTop: "9px", marginRight: "15px", marginLeft: "5px"}}><Icon type="right"/>
                          </div>
                      </div>
                  </div>
                  <div className='car_gray_line' style={{height: "1px", marginTop: "5px"}}></div>
              </div>
            ))
        })
        return (
          <div className="car_content">
              <div style={{
                  background: "lightgray",
                  height: "30px",
                  width: "100%",
                  lineHeight: "25px",
                  paddingLeft: "15px",
                  fontSize: "16px"
              }}>{this.props.itemInfo.year}</div>
              {itemList}
          </div>
        )
    }
}

export default class RepayHistory extends React.Component {

    componentWillMount() {
        document.title = '历史账单'
    }

    render() {
        var views = []
        repayHistoryData.forEach((itemInfo) => {
            views.push(<ItemView itemInfo={itemInfo}/>)
        })
        return (
          <div className='car_content'>
              {views}
          </div>
        )
    }
}