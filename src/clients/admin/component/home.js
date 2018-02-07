import React from 'react'
import {Breadcrumb, Layout, Menu, Icon} from 'antd';
import {Link, Route} from 'react-router-dom'

import CategoryManage from './category'
import GoodsManage from './product'
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
            {path: "/category", title: "分类管理", component: CategoryManage},
            {path: "/goods", title: "货品管理", component: GoodsManage}
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
            collapsed: false,
            defaultSelectedKeys: [],
            defaultOpenKeys: [],
        }
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
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
                breadcrumbNameMap[menuItem.path + subMenuItem.path] = subMenuItem.title

                var path = menuItem.path + subMenuItem.path
                routers.push(
                  <Route path={path} component={subMenuItem.component}/>)
                subMenuItems.push(
                  <Menu.Item key={subMenuItem.path.replace('/', '')}>
                      <Link to={path}>{subMenuItem.title}</Link>
                  </Menu.Item>)
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
                  <Menu theme="dark" defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultOpenKeys={this.state.defaultOpenKeys} mode="inline">
                      {submenus}
                  </Menu>
              </Sider>
              <Layout>
                  <Header style={{background: '#fff', padding: 0}}/>
                  <Content style={{margin: '0 16px'}}>
                      <Breadcrumb style={{margin: '16px 0'}}>
                          {breadcrumbItems}
                      </Breadcrumb>
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