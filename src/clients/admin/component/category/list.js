import React from 'react'

import {Button, Input, Row, Col, Table, Divider, message} from 'antd'

import {queryCategory, addCategory, delCategory} from '../../../../actions/api/category'

export default class ProductManage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            totalcount: 0,
            pagesize: 10,
            listData: [],
            childData: []
        }
    }

    componentWillMount() {
        this.queryCategory(1)
    }

    queryCategory(page) {
        queryCategory({
            props: this.props,
            body: {
                page: page,
                pagesize: this.state.pagesize
            },
            success: (result) => {
                this.setState({
                    totalcount: result.data.total,
                    listData: result.data.result
                })
            },
            error: (message) => {
                console.error(message)
            }
        })
    }

    removeItem(record) {
        delCategory({
            props: this.props,
            body: record.pid ? {'pid': record.pid, child: record} : {'_id': record._id},
            success: (result) => {
                if (result.code == 1) {
                    this.removeLocal(record)
                }
            },
            error: (msg) => {
                message.error('删除失败,' + msg)
            }
        })
    }

    editItem(key) {

    }

    removeLocal(record) {
        if (record.pid) {
            for (var index = 0; index < this.state.childData.length; index++) {
                if (this.state.childData[index]._id == record._id) {
                    this.state.childData.splice(index, 1)
                    break
                }
            }
            this.setState({
                childData: this.state.childData
            })
        } else {
            for (var index = 0; index < this.state.listData.length; index++) {
                if (this.state.listData[index]._id == record._id) {
                    this.state.listData.splice(index, 1)
                    break
                }
            }
            this.setState({
                listData: this.state.listData
            })
        }
    }

    handlePageChange = (page, pageSize) => {
        console.log(page)
        console.log(pageSize)
        this.queryCategory(page)
    }

    addFirstCategory = () => {

    }

    handleTextChange = (e) => {
        var title = e.target.value
        var params = {
            title: title,
        }
        addCategory({
            props: this.props,
            body: params,
            success: (result) => {
                message.success('添加成功')
            },
            error: (err) => {

            }
        })
    }

    handleTextChange2 = (e) => {
        if (this.state.pid == null || this.state.pid == undefined) {
            message.warn("请先选择一级分类")
            return
        }
        var title = e.target.value
        var params = {
            pid: this.state.pid,
            child: {
                title: title
            }
        }
        addCategory({
            props: this.props,
            body: params,
            success: (result) => {
                message.success('添加成功')
            },
            error: (err) => {

            }
        })
    }

    render() {
        var columns = [{
            title: '名称',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                  <a href="javascript:;">编辑</a>
                  <Divider type="vertical"/>
                  <a href="javascript:;" onClick={() => this.removeItem(record)}>删除</a>
                </span>
            )
        }]

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

        return (
          <div>
              <Row>
                  <Col span={4}><Input onPressEnter={this.handleTextChange}/></Col>
                  <Col span={4}><Button type='primary' style={{marginLeft: 10}}
                                        onClick={this.addFirstCategory}>添加一级分类</Button></Col>

                  <Col span={4} offset={4}><Input onPressEnter={this.handleTextChange2}/></Col>
                  <Col span={4}><Button type='primary' style={{marginLeft: 10}}
                                        onClick={this.addFirstCategory}>添加二级分类</Button></Col>
              </Row>

              <Row>
                  <Col span={12}>
                      <label>一级分类</label>
                      <Table style={{width: 400}} scroll={{x: 400, y: 320}}
                             onRow={(record) => {
                                 return {
                                     onClick: () => {
                                         this.setState({
                                             childData: record.child,
                                             pid: record._id
                                         })
                                     }
                                 }
                             }}
                             dataSource={this.state.listData}
                             columns={columns} key="_id"
                             rowSelection={rowSelection}
                             pagination={{
                                 position: 'bottom', total: this.state.totalcount,
                                 onChange: this.handlePageChange
                             }}/>
                  </Col>

                  <Col span={12}>
                      <label>二级分类</label>
                      <Table style={{width: 400}} dataSource={this.state.childData}
                             columns={columns} key="_id"
                             pagination={false}/>
                  </Col>
              </Row>
          </div>
        )
    }
}