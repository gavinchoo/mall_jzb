import React from 'react'
import {Breadcrumb, Layout, Menu, Icon} from 'antd';
import {Link, Route} from 'react-router-dom'
import AddUser from './home/adduser'
import User from './home/user'

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import '../stylesheets/home.css'

const breadcrumbNameMap = {
    '/home': '首页',
    '/home/user': '系统管理',
    '/home/user/userlist': '用户信息',
    '/home/user/adduser': '新增用户'
};

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            collapsed: false,
            defaultSelectedKeys: [],
            defaultOpenKeys: [],
            routeToUser: `${this.props.match.path}/user/userlist`,
            routeToAddUser: `${this.props.match.path}/user/adduser`
        }
    }

    componentWillMount() {
        this.requireAuth()
    }

    handleClick = (e) => {
        console.log('click ', e);
    }

    requireAuth() {
        console.log('requireAuth')
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }

    setDefaultSelect() {
        if (this.props.location.pathname == this.props.match.path) {
            this.props.location.pathname = this.state.routeToPerson
        }
        var selects = this.props.location.pathname.split("/")
        console.log(selects)
        this.state.defaultOpenKeys = new Array(selects[2])
        this.state.defaultSelectedKeys = new Array(selects[3])
    }

    render() {
        this.setDefaultSelect()

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
                      <SubMenu
                        key="person"
                        title={<span><Icon type="team"/><span>人员信息管理</span></span>}
                      >
                          <Menu.Item key="addperson">
                              <Link to={this.state.routeToAddPerson}>新增人员</Link>
                          </Menu.Item>
                      </SubMenu>
                      <SubMenu
                        key="user"
                        title={<span><Icon type="appstore-o"/><span>系统管理</span></span>}
                      >
                          <Menu.Item key="adduser">
                              <Link to={this.state.routeToAddUser}>新增用户</Link>
                          </Menu.Item>
                      </SubMenu>
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
                              <Route path={this.state.routeToUser} component={User}/>
                              <Route path={this.state.routeToAddUser} component={AddUser}/>
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