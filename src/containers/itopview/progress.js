import React from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {Steps} from 'antd'
import 'antd-mobile/lib/card/style/css'
import 'antd-mobile/lib/toast/style/css'
import 'antd-mobile/lib/wing-blank/style/css'
import 'antd-mobile/lib/white-space/style/css'
import 'antd-mobile/lib/steps/style/css'
import {progressData} from './mock/index'

const Step = Steps.Step;

export default class Progress extends React.Component {

    constructor(props) {
        super(props)
        var firstStepInfo = this.getFirstStepInfo()
        var status = props.match.params.status
        this.state = {
            firstStepInfo: firstStepInfo,
            stepCurrent: (status && status == "submit") ? 0 : 2,
            showSubmit: (status && status == "submit") ? "block" : "none"
        }
    }

    getFirstStepInfo() {
        var firstStepInfo
        if (this.props.location.state && this.props.location.state.firstStepInfo) {
            firstStepInfo = this.props.location.state.firstStepInfo
        }
        if (!firstStepInfo) {
            var applyInfo = localStorage.getItem("applyInfo")
            if (applyInfo) {
                firstStepInfo = JSON.parse(applyInfo).firstStepInfo
            }
        }
        return firstStepInfo
    }

    componentDidUpdate(nextProps) {
        console.log(nextProps)
    }

    componentWillMount() {
        document.title = '办理进度'
    }

    contentLine(props) {

        var value = props.value
        if (this.state.firstStepInfo) {
            if (props.title == "姓名") {
                value = this.state.firstStepInfo.name
            }
            if (props.title == "手机号码") {
                value = this.state.firstStepInfo.phone
            }
        }

        return (<div style={{display: 'flex'}}>
            <div style={{width: '70px', textAlign: 'right', fontSize: "12px", color:'gray'}}>{props.title}</div>
            <div style={{marginLeft: '20px', fontSize: "12px"}}>{value}</div>
        </div>)
    }

    render() {

        var baseInfo = []
        progressData.base.forEach((item) => {
            baseInfo.push(this.contentLine(item))
        })

        var typeInfo = []
        progressData.type.forEach((item) => {
            typeInfo.push(this.contentLine(item))
        })

        return (
          <div className="car_content">
              <div style={{display: this.state.showSubmit}} className='car_progress_success'>
                  <div style={{'color': 'blue', 'font-size': '14px'}}>申请提交成功，请等待审核</div>
                  <div style={{'color': 'gray', 'font-size': '10px', 'margin-top': '6px'}}>您可以到首页->进度查询，查看办理进度。</div>
              </div>

              <WhiteSpace size="sm"/>
              <WingBlank size="lg">
                  <div className="car_progress_title">
                      申请信息
                  </div>
                  <Card>
                      <Card.Body>
                          {baseInfo}
                      </Card.Body>
                  </Card>
                  <WhiteSpace size="sm"/>
                  <Card>
                      <Card.Body>
                          {typeInfo}
                      </Card.Body>
                  </Card>

                  <WhiteSpace/>
                  <div className="car_progress_title">
                      办理进度
                  </div>
                  <Steps direction="vertical" size="large" current={this.state.stepCurrent}>
                      <Step title="业务预受理" description=""/>
                      <Step title="征信合规确认" description=""/>
                      <Step title="正式受理" description=""/>
                      <Step title="放款提车" description=""/>
                  </Steps>
              </WingBlank>
          </div>
        )
    }
}