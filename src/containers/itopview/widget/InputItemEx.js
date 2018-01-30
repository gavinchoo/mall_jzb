import React from 'react'
import {InputItem} from 'antd-mobile'
import 'antd-mobile/lib/input-item/style/css'

export default class InputItemEx extends React.Component {
    render() {
        return (
          <InputItem value={this.props.value}
                     onChange={this.props.onChange}
                     editable={this.props.editable}
                     defaultValue={this.props.defaultValue}
                     type={this.props.type}
                     clear={this.props.clear}
                     placeholder={this.props.placeholder}
                     style={{fontSize: "14px"}}>
              <div style={{fontSize: "14px",color:'#555555'}}>{this.props.title}</div>
          </InputItem>
        )
    }
}