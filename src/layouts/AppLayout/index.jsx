import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import {
  AreaChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { logout } from 'modules/Auth/reducers/auth'
import { history } from 'utils'
import styles from './styles.module.scss'

const { Sider, Content } = Layout

const AppLayout = ({ children }) => {

  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true)
  const { location } = history
  const locationKey = location.pathname.split('/')[1]

  function toggle() {
    setCollapsed(!collapsed)
  }

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <Layout className={styles.root}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
      >
        <div className={styles.sidebarHead}>
          <Button
            type='primary'
            onClick={toggle}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          className={styles.menu}
          selectedKeys={[locationKey]}
        >
          <Menu.Item key='dashboard'>
            <Link to='/dashboard'>
              <AreaChartOutlined />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='users'>
            <Link to='/users'>
              <TeamOutlined />
              <span>Users</span>
            </Link>
          </Menu.Item>
          <Menu.Divider className={styles.divider} />
          <Menu.Item onClick={handleLogout}>
            <LogoutOutlined />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
        <div className={styles.copy}>
          Frontbyte 2020
        </div>
      </Sider>
      <Layout>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
