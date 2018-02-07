import React from 'react'

import {Button, Input, Row, Col, message} from 'antd'

import {queryCategory, addCategory} from '../../../actions/api/category'

import CategoryList from './category/list'
import AddCategory from './category/add'

export default class ProductManage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categorylist: []
        }
    }

    componentWillMount() {
        queryCategory({
            props: this.props,
            body: {},
            success: (result) => {
                this.setState({
                    categorylist: result
                })
            },
            error: (err) => {
                message.warn('添加失败')
            }
        })
    }

    addFirstCategory = () => {

    }

    handleTextChange = (e) => {
        var title = e.target.value
        var params = {
            pid: "101",
            title: title,
        }
        addCategory({
            props: this.props,
            body: params,
            success: (result) => {
                this.state.categorylist.push(params)
            },
            error: (err) => {

            }
        })
    }

    render() {
        return (
          <div>
              <Row>
                  <Col span={4}><Input onPressEnter={this.handleTextChange}/></Col>
                  <Col span={4}><Button type='primary' style={{marginLeft: 10}}
                                        onClick={this.addFirstCategory}>添加一级分类</Button></Col>
              </Row>

          </div>
        )
    }
}