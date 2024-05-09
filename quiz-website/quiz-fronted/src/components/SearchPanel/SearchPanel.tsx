import { Input, Space } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

function SearchPanel() {
  return (
    <Space>
      <Input addonBefore={<SearchOutlined/>} size="large"/>
    </Space>
  );
}

export default SearchPanel;