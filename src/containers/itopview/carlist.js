import React from 'react'
import {WingBlank, SearchBar} from 'antd-mobile'
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

        var carList = []
        var carSlider = []
        carListData.car_slider.map((item) => {
            carSlider.push((
              <Link to="/detail">
                  <div><img style={{width: '100%', height: 140, margin: 'auto'}} src={item.image}/></div>
              </Link>)
            )
        })
        carListData.car_list.map((item) => {
            carList.push((<Link to="/detail"><CarInfoItem item={item}/></Link>))
        })

        this.state = {
            carList: carList,
            carSlider: carSlider,
            setting: {
                arrows: false,
                accessibility: false,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplaySpeed: 2000,
            }
        }

    }

    componentWillMount() {
        document.title = '分期购车'
    }

    render() {
        return (
          <div className='car_content'>
              <div>
                  <SearchBar
                    placeholder="请搜索品牌"
                    onChange={this.onChange}
                  />
              </div>
              <Slider {...this.state.setting}>
                  {this.state.carSlider}
              </Slider>
              <WingBlank>
                  <div>{this.state.carList}</div>
              </WingBlank>
          </div>
        )
    }
}