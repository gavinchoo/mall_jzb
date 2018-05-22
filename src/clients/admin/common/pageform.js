import React from 'react'
import {Modal, Table, Upload, Icon, Form, Input, Button, DatePicker, Select, TimePicker, Row, Col, message} from 'antd'
import moment from 'moment'
import {requestPost} from '../../../common/utils/request';

const Search = Input.Search;
const FormItem = Form.Item
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
};

const containerSpan = {xs: 8, sm: 16, md: 24, lg: 32}

class PageForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            totalcount: 2,
            searchData: [],
            columns: [],
            f7: {},
            fileList: [],  // 附件列表
            fileRemoved: [],
            fileFiled: ""  // 附件字段
        }
    }

    componentWillMount() {
        this.initFileList();
    }

    initFileList() {
        if (!this.props.dataSource) {
            return;
        }
        this.props.columns.map((column, index) => {
            if (column.type == Object && column.f7) {
                // 获取附件参数
                var values = this.props.dataSource[column.dataIndex];
                if (values) {
                    var fileList = values.map((item) => {
                        return {
                            uid: item._id,
                            name: item.originalname,
                            status: 'done',
                            url: column.f7.download + "?avatar_id=" + item._id,
                            _id: item._id,
                            remove: column.f7.remove,
                        }
                    })
                    this.setState({fileList});
                }
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let key in this.state.f7) {
                    values[key] = this.state.f7[key];
                }
                if (this.state.fileList) {
                    var files = this.props.dataSource[this.state.fileFiled];
                    if (!files) {
                        files = [];
                    }

                    this.state.fileList.map((item) => {

                        if (item.response) {
                            // 防止重复提交数据
                            var has = false;
                            files.map((item1) => {
                                if (item1._id == item.response.data.file._id) {
                                    has = true;
                                }
                            })
                            if (!has) {
                                files.push(item.response.data.file);
                            }
                        }
                    })
                    values[this.state.fileFiled] = files;
                }
                console.log('Received values of form: ', values);
                if (this.props.onSubmit) {
                    this.props.onSubmit(values);
                } else {
                    this.onSubmit(values)
                }
            }
        });
    }

    onSubmit = (values) => {
        var uri = this.props.uri.create;
        if (this.props.dataSource && this.props.dataSource._id) {
            uri = this.props.uri.edit;
            values["_id"] = this.props.dataSource._id;
        } else {
            uri = this.props.uri.create;
        }

        if (this.state.fileRemoved) {
            this.onRemoveFile(this.state.fileRemoved.pop());
        }

        requestPost(uri, {
            props: this.props,
            body: values,
            success: (result) => {
                message.success('提交成功')
            },
            error: (err) => {
                message.error(err ? err.message : '提交失败')
            }
        })
    }

    onSearch = (dataIndex, f7) => {
        this.setState({
            columns: f7.columns,
            curSearch: dataIndex
        })
        requestPost(f7.query, {
            props: this.props,
            body: {page: 1, pagesize: 0},
            success: (result) => {
                this.setState({
                    visible: true,
                    totalcount: result.data.total,
                    searchData: result.data.result,
                })
            },
            error: (err) => {
                message.error(err ? err.message : '获取数据失败')
            }
        })
    }

    onRemoveFile = (file) => {
        if (file) {
            requestPost(file.remove, {
                props: this.props,
                body: {avatar_id: file.uid},
                success: (result) => {
                    this.onRemoveFile(this.state.fileRemoved.pop());
                },
                error: (error) => {
                    message.error(error.message)
                }
            })
        }
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.setState({
            f7: [],
            fileList: []
        })
    }

    handleModalOk = () => {
        this.setState({
            visible: false,
        })
    }

    handleModalCancel = () => {
        this.setState({
            visible: false,
        })
    }

    handleSearchRowSelect = (item) => {
        this.state.visible = false;
        this.state.f7[this.state.curSearch] = item;
        this.props.columns.map((column) => {
            if (this.state.curSearch == column.key) {
                let map = {};
                map[this.state.curSearch] = item[column.f7.show];
                this.props.form.setFieldsValue(map);
            }
        })
    }

    handleAccachmentCancel = () => this.setState({previewVisible: false})

    handleAccachmentPreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleAccachmentChange = ({fileList}) => {
        console.log("handleAccachmentChange", fileList);
        this.setState({fileList});
    }

    removeUploadedFile = (file) => {
        var saved = this.props.dataSource[this.state.fileFiled];
        if (saved) {
            this.props.dataSource[this.state.fileFiled] = saved.filter((item) => {
                if (file._id == item._id) {
                    return false;
                }
                return true;
            })
        }
        console.log("state.fileList", this.state.fileList)
        var uploaded = this.state.fileList;
        if (uploaded) {
            this.state.fileList = uploaded.filter((item) => {
                if (item.response) {
                    if (file._id == item.response.data.file._id) {
                        return false;
                    }
                } else if (item._id) {
                    if (file._id == item._id) {
                        return false;
                    }
                }
                return true;
            })

            console.log("state.fileList", this.state.fileList)
        }
    }

    handleAccachmentRemove = (file) => {
        console.log("remove file", file)
        if (file.remove) {
            this.removeUploadedFile(file);
            this.state.fileRemoved.push(file);
        } else {
            this.props.columns.map((column, index) => {
                if (column.type == Object && column.f7) {
                    var response = file.response.data.file;
                    if (response) {
                        var item = {
                            uid: response._id,
                            name: response.originalname,
                            status: 'done',
                            _id: response._id,
                            url: column.f7.download + "?avatar_id=" + response._id,
                            remove: column.f7.remove,
                        }
                        this.removeUploadedFile(item);
                        this.state.fileRemoved.push(item);
                    }
                }
            })
        }
    }

    formInput = (props) => {
        const {getFieldDecorator} = this.props.form;
        return (
          <Col span={containerSpan}>
              <FormItem key={props.key} label={props.title}>
                  {
                      getFieldDecorator(props.dataIndex, {
                          rules: [
                              {required: props.required, message: "请输入" + props.title}
                          ]
                      })(
                        <Input placeholder={"请输入" + props.title}/>
                      )
                  }
              </FormItem>
          </Col>
        )
    }

    formSearch = (props) => {
        const {getFieldDecorator} = this.props.form;

        var value = "";
        if (this.state.f7[props.dataIndex]) {
            var item = this.state.f7[props.dataIndex];
            value = item[props.f7.show]
        }
        return (
          <Col span={containerSpan}>
              <FormItem key={props.key} label={props.title}>
                  {
                      getFieldDecorator(props.dataIndex, {
                          initialValue: value,
                          rules: [
                              {required: props.required, message: "请选择" + props.title}
                          ]
                      })(
                        <Search
                          value={value}
                          placeholder={"请选择" + props.title}
                          onSearch={value => this.onSearch(props.dataIndex, props.f7)}
                          enterButton
                        />
                      )
                  }
              </FormItem>
          </Col>)
    }

    formDatePicker = (props) => {
        const {getFieldDecorator} = this.props.form;

        return (
          <Col span={containerSpan}>
              <FormItem key={props.key} label={props.title}>
                  {
                      getFieldDecorator(props.dataIndex, {
                          rules: [
                              {required: props.required, message: "请选择" + props.title}
                          ]
                      })(
                        <DatePicker placeholder={"请选择" + props.title}/>
                      )
                  }
              </FormItem>
          </Col>)
    }

    formTimePicker = (props) => {
        const {getFieldDecorator} = this.props.form;

        return (
          <FormItem key={props.key} label={props.title} {...formItemLayout}>
              {
                  getFieldDecorator(props.dataIndex, {
                      rules: [
                          {required: props.required, message: "请选择" + props.title}
                      ]
                  })(
                    <TimePicker placeholder={"请选择" + props.title}/>
                  )
              }
          </FormItem>)
    }

    formAttachment = (props) => {
        const {getFieldDecorator} = this.props.form;
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
          <div>
              <Icon type="plus"/>
              <div className="ant-upload-text">上传</div>
          </div>
        );
        this.state.fileFiled = props.dataIndex;
        return (
          <Col span={24}>
              <FormItem key={props.key} label={props.title} style={{display: "flex", marginTop: "20px"}}>
                  {
                      getFieldDecorator(props.dataIndex, {
                          initialValue: fileList,
                          rules: [
                              {required: props.required, message: "请选择" + props.title}
                          ]
                      })(
                        <div>
                            <Upload
                              action={props.f7.upload}
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={this.handleAccachmentPreview}
                              onChange={this.handleAccachmentChange}
                              onRemove={this.handleAccachmentRemove}
                            >
                                {uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleAccachmentCancel}>
                                <img alt="example" style={{width: '100%'}} src={previewImage}/>
                            </Modal>
                        </div>
                      )
                  }
              </FormItem>
          </Col>)
    }

    formSelect = (props) => {
        const {getFieldDecorator} = this.props.form;
        const options = props.f7.map((item, index) => {
            return <Option key={item.value} value={item.value}>{item.title}</Option>
        })
        return (
          <FormItem key={props.key} label={props.title} {...formItemLayout} >
              {
                  getFieldDecorator(props.dataIndex, {
                      initialValue: "1",
                      rules: [
                          {required: props.required, message: "请选择" + props.title}
                      ]
                  })(
                    <Select defaultValue="1">
                        {options}
                    </Select>
                  )
              }
          </FormItem>)
    }

    render() {

        var formItems = this.props.columns.map((item, index) => {
            var forItem;
            if (item.type == String) {
                forItem = this.formInput(item);
            } else if (item.type == Date) {
                forItem = this.formDatePicker(item);
            } else if (item.type == Array && item.f7) {
                if (item.f7 instanceof Array) {
                    forItem = this.formSelect(item);
                } else {
                    forItem = this.formSearch(item);
                }
            } else if (item.type == Object) {
                if (item.f7) {
                    forItem = this.formAttachment(item);
                }
            }
            return forItem;
        })

        console.log(this.state.searchData)
        return (

          <Form onSubmit={this.handleSubmit}>
              <Row gutter={24} type="flex">
                  {formItems}
              </Row>
              <Modal visible={this.state.visible}
                     onOk={this.handleModalOk}
                     onCancel={this.handleModalCancel}
                     width={800}
                     footer={null}
              >

                  <Table scroll={{x: 800, y: 320}}
                         onRow={(record) => {
                             return {
                                 onClick: () => {
                                     this.handleSearchRowSelect(record);
                                 }
                             }
                         }}
                         dataSource={this.state.searchData}
                         columns={this.state.columns}
                         rowKey="_id"
                         pagination={{
                             position: 'bottom', total: this.state.totalcount,
                         }}
                  />
              </Modal>
              <Row style={{marginTop: "30px"}}>
                  <Col sm={{span: 8, offset: 6}}
                       xs={{span: 8, offset: 1}}>
                      <FormItem>
                          <Button type="primary" htmlType='submit'>提交</Button>
                      </FormItem>
                  </Col>
                  <Col sm={{span: 8}}
                       xs={{span: 8}}>
                      <FormItem>
                          <Button type="primary" onClick={this.handleReset}>重置</Button>
                      </FormItem>
                  </Col>
              </Row>
          </Form>
        )
    }
}

export default Form.create({
    mapPropsToFields(props) {
        var dataSource = props.dataSource;
        var columns = props.columns;
        var columnsValue = {};
        for (var key in dataSource) {

            var value = props.dataSource[key];
            columns.map((item, index) => {
                if (key == item.key) {
                    if (item.type == Date) {
                        value = moment(value);
                    } else if (item.type == Array) {
                        value = value[item.f7.show]
                    }
                }
            })
            columnsValue[key] = Form.createFormField({
                ...props[key],
                value: value,
            })
        }
        return columnsValue;
    }
})(PageForm);
