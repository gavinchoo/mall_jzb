import React from 'react'
import {Button, Toast} from 'antd-mobile'
import 'antd-mobile/lib/button/style/css'
import 'antd-mobile/lib/input-item/style/css'
import 'antd-mobile/lib/toast/style/css'
import router from './routers'

import InputItemEx from './widget/InputItemEx'

import { progressData } from './mock/index'

class StepOne extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            phone: "",
            verify: "",
        }
    }

    handleGetVerify = () => {
        this.setState({
            verify: "2334"
        })
    }

    handleVerifyChange = (value) => {
        this.setState({
            verify: value
        })
    }

    handleNameChange = (value) => {
        this.setState({
            name: value
        })
    }


    handlePhoneChange = (value) => {
        this.setState({
            phone: value
        })
    }


    handleNextStep = () => {
        if (!this.state.name || this.state.name.length == 0) {
            Toast.show("请输入姓名", 1)
            return
        }

        if (!this.state.phone || this.state.phone.length == 0) {
            Toast.show("请输入手机号", 1)
            return
        }

        if (!this.state.verify || this.state.verify.length == 0) {
            Toast.show("请输入验证码", 1)
            return
        }
        this.props.handleNextStep(this.state)
    }

    render() {
        return (
          <div>
              <InputItemEx value={this.state.name} onChange={this.handleNameChange} clear={true} placeholder="请输入姓名"
                           title="姓名"/>
              <InputItemEx value={this.state.phone} onChange={this.handlePhoneChange} clear={true} placeholder="请输入手机号"
                           type="phone"
                           title="手机号码"/>
              <div style={{display: 'flex'}}>
                  <InputItemEx onChange={this.handleVerifyChange} value={this.state.verify}
                               placeholder="输入手机验证码" title="验证码"/>
                  <div onClick={this.handleGetVerify} style={{
                      position: 'fixed',
                      right: "14px",
                      fontSize: "14px",
                      lineHeight: "45px",
                      height: "100%",
                      color: "#F4783A"
                  }}>
                      获取验证码
                  </div>
              </div>
              <InputItemEx editable={false} value={progressData.carInfo.brand} title="购车品牌"/>
              <InputItemEx editable={false} value={progressData.carInfo.type} title="意向车型"/>
              <InputItemEx editable={false} value={progressData.carInfo.money} title="指导价"/>

              <Button onClick={this.handleNextStep} className='car_detail_btn' style={{"margin-top": 40}}>下一步</Button>
          </div>
        )
    }
}

export default class Portal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showStepOne: true,
        }
    }

    componentWillMount() {
        document.title = '申请分期购车'
    }

    handleNextStep = (data) => {
        this.props.history.replace({pathname: router.applyforTwo, state: data})
    }

    render() {
        return (
          <div className="car_content">
              <StepOne handleNextStep={this.handleNextStep}/>
          </div>
        )
    }
}