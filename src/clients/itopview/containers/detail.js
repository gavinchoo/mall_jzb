import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'antd-mobile'
import {connect} from 'react-redux'

import router from './routers'

class Detail extends React.Component {

    componentWillMount() {
        document.title = '详情'
    }

    render() {
        const images = []
        if (this.props.detailData && this.props.detailData.detailImages) {
            this.props.detailData.detailImages.forEach((image, index) => {
                images.push(<img key={index.toString()} style={{width: '100%'}} src={image}/>)
            })
        }
        return (
          <div className='car_content'>
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

function mapStateToProps(state, ownProps) {
    console.log("mapStateToProps state ", state)
    return {
        detailData: state.detailData,
    }
}

export default connect(mapStateToProps)(Detail)