import React from 'react'
import {Button, Toast} from 'antd-mobile'
import router from './routers'
import InputItemEx from '../widget/InputItemEx'

export default class StepTwo extends React.Component {

    constructor(props) {
        super(props)
        var data = this.props.location.state;
        this.state = {
            animating: false,
            firstStepInfo: data
        }
    }

    componentWillUnmount() {
        clearTimeout(this.closeTimer);
    }

    componentWillMount() {
        document.title = '申请分期购车'
    }

    showToast = () => {
        Toast.loading("数据提交中...", 3, () => {
            localStorage.setItem("applyInfo", JSON.stringify(this.state))
            this.props.history.replace({pathname: router.progress.replace(':status', 'submit'), state: this.state})
        })
    }

    render() {
        return (
          <div>
              <InputItemEx defaultValue="内部员工3年" title="金融分期产品"/>
              <InputItemEx editable={false} defaultValue="￥180,000.00" title="贷款金额"/>
              <InputItemEx editable={false} defaultValue="54.98%" title="贷款比例"/>
              <InputItemEx editable={false} defaultValue="￥147,400.00" title="首付金额"/>
              <InputItemEx editable={false} defaultValue="45.02%" title="首付比例"/>
              <InputItemEx editable={false} defaultValue="36" title="期数"/>
              <InputItemEx editable={false} defaultValue="等额本息" title="还款方式"/>
              <InputItemEx editable={false} defaultValue="￥5,424.00" title="分期月供"/>
              <Button onClick={this.showToast} className='car_detail_btn'
                      style={{"marginTop": 40}}>提交申请</Button>
          </div>
        )
    }
}