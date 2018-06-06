import React from 'react'
import {Select} from 'antd';

const Option = Select.Option;
import {requestPost} from '../../../common/utils/request';
import eventBus from "../../../common/utils/eventbus";

const Uri = {
    query: '/api/generator/project/query',
}

export default class SelectProject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
        }
    }

    componentWillMount() {
        this.queryForPage(1)
    }

    handleProjectChange = (value) => {
        var item = this.state.listData.find((item) => {
            return item._id == value
        })
        localStorage.setItem("project", item._id);
        eventBus.emit("changeproject", item);
    }

    queryForPage(page) {
        requestPost(Uri.query, {
            props: this.props,
            body: {
                page: page,
                pagesize: 0
            },
            success: (result) => {
                this.setState({
                    listData: result.data.result,
                })
            },
            error: (message) => {
                console.error(message)
            }
        })
    }

    render() {

        var options = []
        if (this.state.listData) {
            options = this.state.listData.map((item) => {
                return (<Option key={item._id} value={item._id}>{item.projectName}</Option>);
            })
        }

        return (<Select
            showSearch
            style={{width: 200, marginLeft: 30}}
            defaultValue={localStorage.getItem("project")}
            placeholder="选择项目"
            optionFilterProp="children"
            onChange={this.handleProjectChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
              {options}
          </Select>
        )
    }
}