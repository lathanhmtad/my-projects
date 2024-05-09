import { Button, Space } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

import { CiTrash } from 'react-icons/ci';

import { ListResponse } from '../../utils/FetchUtils';
import useManageHeaderButtonsViewModel from './ManageHeaderButtons.vm';

export interface ManageHeaderButtonsProps {
  listResponse: ListResponse;
  resourceUrl: string;
  resourceKey: string;
}

function ManageHeaderButtons(props: ManageHeaderButtonsProps) {
  const { handleDeleteBatchEntitiesButton } = useManageHeaderButtonsViewModel(props);

  return (
    <Space>
      <Button icon={<PlusOutlined/>} size="large" type="primary" ghost>Thêm mới</Button>
      <Button onClick={handleDeleteBatchEntitiesButton} icon={<CiTrash/>} size="large" danger>Xóa hàng loạt</Button>
    </Space>
  );
}

export default ManageHeaderButtons;