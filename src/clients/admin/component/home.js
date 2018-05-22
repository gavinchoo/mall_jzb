import React from 'react'
import {Breadcrumb, Layout, Menu, Icon, Row, Col} from 'antd';
import {Link, Route} from 'react-router-dom'

import CategoryManage from './category/list'

import ProductList from '../component1/product/productlist'
import ProductAdd from '../component1/product/productadd'

import CategoryList from '../component1/product/categorylist'
import CategoryAdd from '../component1/product/categoryadd'

import FileList from '../component1/file/filelist'
import FileAdd from '../component1/file/fileadd'

import UserManage from './system/user.list'

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import '../styles/home.css'

const route = {
    product: {
        title: "商品管理",
        path: "/product",
        icon: "appstore-o",
        child: [
            {path: "/category", title: "分类管理", component: CategoryList, editable: true},
            {path: "/category_add", title: "新增分类", component: CategoryAdd, isMenu: false},
            {path: "/goods", title: "货品管理", component: ProductList, editable: true},
            {path: "/goods_add", title: "新增货品", component: ProductAdd, isMenu: false}
        ]
    },
    file: {
        title: "文件管理",
        path: "/file",
        icon: "appstore-o",
        child: [
            {path: "/file", title: "文件管理", component: FileList},
            {path: "/file_add", title: "新增文件", component: FileAdd, isMenu: false},
        ]
    },
    account: {
        title: "系统管理",
        path: "/system",
        icon: "setting",
        child: [
            {path: "/user", title: "用户管理", component: UserManage},
        ]
    }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            editable: false,
            path: {add: "/product"},
            collapsed: false,
            defaultSelectedKeys: [],
            defaultOpenKeys: [],
        }
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }

    onSelect = (item) => {
        console.log("onSelect", item)
        for (var key in route) {
            var menuItem = route[key]
            menuItem.child.map((subMenuItem) => {
                if (item.key == subMenuItem.path.replace('/', '')) {
                    if (subMenuItem.editable == undefined || !subMenuItem.editable) {
                        this.setState({
                            editable: false,
                        })
                    } else {
                        this.setState({
                            path: {
                                add: menuItem.path + subMenuItem.path + "_add"
                            },
                            editable: true,
                        })
                    }
                }
            })
        }

    }

    setDefaultSelect() {
        console.log("match.path", this.props.match.path)
        if (this.props.location.pathname == this.props.match.path) {
            this.props.location.pathname = route.product.path + route.product.child[0].path
        }
        var selects = this.props.location.pathname.split("/")
        console.log("selects", selects)
        this.state.defaultOpenKeys = new Array(selects[selects.length - 2])
        this.state.defaultSelectedKeys = new Array(selects[selects.length - 1])
    }

    createMenu() {
        var breadcrumbNameMap = {}
        var submenus = []
        var routers = []
        for (var key in route) {
            var menuItem = route[key]
            breadcrumbNameMap[menuItem.path] = menuItem.title
            var subMenuItems = []
            menuItem.child.map((subMenuItem) => {

                var path = menuItem.path + subMenuItem.path

                breadcrumbNameMap[path] = subMenuItem.title
                routers.push(
                  <Route key={path} path={path} component={subMenuItem.component}/>)

                if (subMenuItem.isMenu == undefined || subMenuItem.isMenu) {
                    subMenuItems.push(
                      <Menu.Item key={subMenuItem.path.replace('/', '')}>
                          <Link to={path}>{subMenuItem.title}</Link>
                      </Menu.Item>)
                }
            })

            submenus.push(
              <SubMenu
                key={menuItem.path.replace('/', '')} title={
                  <span><Icon type={menuItem.icon}/><span>{menuItem.title}</span></span>}>
                  {subMenuItems}
              </SubMenu>)
        }
        return {submenus, breadcrumbNameMap, routers}
    }

    render() {
        this.setDefaultSelect()

        var {submenus, breadcrumbNameMap, routers} = this.createMenu()

        const {location} = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            console.log(url)
            return (
              <Breadcrumb.Item key={url}>
                  <Link to={url}>
                      {breadcrumbNameMap[url]}
                  </Link>
              </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [].concat(extraBreadcrumbItems);
        return (
          <Layout style={{minHeight: '100vh'}}>
              <Sider
                breakpoint="lg"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                  <div className="logo"/>
                  <Menu onSelect={this.onSelect} theme="dark" defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultOpenKeys={this.state.defaultOpenKeys} mode="inline">
                      {submenus}
                  </Menu>
              </Sider>
              <Layout>
                  <Header style={{background: '#fff', padding: 0}}/>
                  <Content style={{margin: '0 16px'}}>
                      <Row>
                          <Col span={16}>
                              <Breadcrumb style={{margin: '16px 0'}}>
                                  {breadcrumbItems}
                              </Breadcrumb>
                          </Col>
                          <Col span={4} offset={3} style={{lineHeight: "50px", textAlign: "center"}}>
                              <Link to={this.state.path.add} style={{display: this.state.editable ? "block" : "none"}}>
                                  新增
                              </Link>
                          </Col>
                      </Row>

                      <div style={{padding: 20, background: '#fff', minHeight: 420}}>
                          <div className="home_content">
                              {routers}
                          </div>
                      </div>
                  </Content>
                  <Footer style={{textAlign: 'center'}}>
                      Ant Design ©2016 Created by Ant UED
                  </Footer>
              </Layout>
          </Layout>
        )
    }
}