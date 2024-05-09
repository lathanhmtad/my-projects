import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout, theme } from 'antd';

import AdminHeader from '../components/AdminHeader';
import AdminSider from '../components/AdminSider';

const { Content } = Layout;

function Admin() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <AdminSider collapsed={collapsed}/>
      <Layout>
        <AdminHeader
          colorBgContainer={colorBgContainer} collapsed={collapsed} setCollapsed={setCollapsed}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: '16px 24px',
            height: '100vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;