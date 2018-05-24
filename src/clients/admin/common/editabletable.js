import React from 'react'
import {Table, Input, Icon, Button, Popconfirm} from 'antd';
import './styles/editable.less'

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: this.props.value ? false : true,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({value});
    }
    check = () => {
        this.setState({editable: false});
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({editable: true});
    }

    render() {
        const {value, editable} = this.state;
        return (
          <div className="editable-cell">
              {
                  editable ?
                    <div className="editable-cell-input-wrapper">
                        <Input
                          value={value}
                          onChange={this.handleChange}
                          onPressEnter={this.check}
                        />
                        <Icon
                          type="check"
                          className="editable-cell-icon-check"
                          onClick={this.check}
                        />
                    </div>
                    :
                    <div className="editable-cell-text-wrapper">
                        {value || ' '}
                        <Icon
                          type="edit"
                          className="editable-cell-icon"
                          onClick={this.edit}
                        />
                    </div>
              }
          </div>
        );
    }
}

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [...this.props.columns];
        this.columns.map((column, index) => {
            column.render = (text, record) => {
                return <EditableCell
                  value={text}
                  onChange={this.onCellChange(record.key, column.dataIndex)}
                />
            }
        })

        this.columns.push({
            title: '操作',
            dataIndex: 'action',
            width: 60,
            render: (text, record) => {
                return (
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                      <a href="javascript:;">Delete</a>
                  </Popconfirm>
                );
            },
        })

        if (this.props.dataSource) {
            this.props.dataSource.map((item, index) => {
                item['key'] = index;
            })
        }
        this.state = {
            dataSource: this.props.dataSource ? [...this.props.dataSource] : [],
        };
    }

    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({dataSource});
                this.props.onEntityChange(this.props.dataIndex, dataSource);
            }
        };
    }

    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        const tempDataSource = dataSource.filter(item => item.key !== key);
        this.setState({dataSource: tempDataSource});
        this.props.onEntityChange(this.props.dataIndex, tempDataSource);
    }

    handleAdd = () => {
        const {dataSource} = this.state;
        const newData = {
            key: dataSource.length
        };
        this.setState({
            dataSource: [...dataSource, newData],
        });
    }

    render() {
        const {dataSource} = this.state;
        const columns = this.columns;
        console.log(this.props);
        return (
          <div>
              <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
              <Table bordered dataSource={dataSource} columns={columns}
                     scroll={this.props.scroll}
                     pagination={null}/>
          </div>
        );
    }
}