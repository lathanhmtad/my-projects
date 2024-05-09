import Sider from 'antd/es/layout/Sider';
import { Spin } from 'antd';
import { FaReact } from 'react-icons/fa';

import SiderMenu from './SiderMenu';

interface SiderAdminProps {
  collapsed: boolean;
}

function SiderAdmin({ collapsed }: SiderAdminProps) {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo"
           style={{
             textAlign: 'center',
             margin: '24px 0'
           }}
      >
        <Spin size="large"
              indicator={
                <FaReact
                  style={
                    {
                      animation: 'spin 3s linear infinite'
                    }
                  }
                />
              }
        />
      </div>
      <SiderMenu/>
    </Sider>
  );
}

export default SiderAdmin;
