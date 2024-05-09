import { Button } from "antd"
import { Header } from "antd/es/layout/layout"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

interface AdminHeaderProps {
    colorBgContainer: string,
    collapsed: boolean,
    setCollapsed: Function
}

function AdminHeader({ colorBgContainer, collapsed, setCollapsed }: AdminHeaderProps) {
    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    )
}

export default AdminHeader