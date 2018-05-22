import React from 'react'
import PageForm from '../../common/pageform'
import {Columns, Uri} from "./map"

export default class Add extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    render() {

        return (
          <div style={{width: '95%', marginRight: 'auto', marginLeft: 'auto'}}>
              <PageForm columns={Columns} uri={Uri} dataSource={this.props.location.params}/>
          </div>
        )
    }
}