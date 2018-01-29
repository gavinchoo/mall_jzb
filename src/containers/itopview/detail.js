import React from 'react'
import {Link, Route} from 'react-router-dom'
import {Toast, Button, WingBlank} from 'antd-mobile'
import 'antd-mobile/lib/button/style/css'
import 'antd-mobile/lib/toast/style/css'

import {detailData} from './mock/index'

import router from './routers'

export default class Detail extends React.Component {

    componentWillMount() {
        document.title = '详情'
    }

    render() {
        const images = []
        detailData.images.forEach((image) => {
            images.push(<img style={{width: '100%'}} src={image}/>)
        })
        return (
          <div className='car_detail'>
              <div className='car_detail_bg'>
                  {images}
              </div>
              <div className='car_detail_btn_bg'>
                  <Link to={router.applyforOne}>
                      <Button className='car_detail_btn'>参加活动，申请分期购车</Button>
                  </Link>
              </div>
          </div>
        )
    }
}