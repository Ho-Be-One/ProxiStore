import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const {Sider, Content, Footer } = Layout;

const LayoutFrame = (props) => {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={false}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{position: 'sticky', top: '0px'}}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to='/'>Home</Link> 
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Proxistore ©2021 Created by Djendo Essiko</Footer>
        </Layout>
      </Layout>
    )
}

export default LayoutFrame;