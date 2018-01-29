import React from 'react'
import {WingBlank, SearchBar, Icon} from 'antd-mobile'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'antd-mobile/lib/button/style/css'
import 'antd-mobile/lib/wing-blank/style/css'
import 'antd-mobile/lib/search-bar/style/css'
import 'antd-mobile/lib/icon/style/css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {carListData} from './mock/index'

class CarInfoItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
          <div className='car_info_item'>
              <h3>{this.props.item.title}</h3>
              <img src={this.props.item.image}/>
          </div>
        )
    }
}

export default class CarList extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        document.title = '我要贷款'
    }

    render() {

        var carList = []
        var carSlider = []
        carListData.car_list.map((item) => {
            carList.push((<Link to="/detail"><CarInfoItem item={item}/></Link>))
            carSlider.push((
              <Link to="/detail">
                  <div><img style={{width: '100%', height: 140, margin: 'auto'}} src={item.image}/></div>
              </Link>)
            )
        })
        var setting = {
            arrows: false,
            accessibility: false,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 1500,
        }
        return (
          <div className='car_content'>
              <div>
                  <SearchBar
                    placeholder="请搜索品牌"
                    onChange={this.onChange}
                  />
              </div>
              <Slider {...setting}>
                  {carSlider}
              </Slider>
              <WingBlank>
                  <div>{carList}</div>
              </WingBlank>
          </div>
        )
    }
}