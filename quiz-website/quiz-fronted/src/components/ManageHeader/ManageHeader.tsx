import React from 'react';
import { Space } from 'antd';

interface ManageHeaderProps {
  children: React.ReactNode;
}

function ManageHeader({
  children
}: ManageHeaderProps) {
  return (
    <Space
      align="center"
      size="large"

    >
      {children}
    </Space>
  );
}

export default ManageHeader;