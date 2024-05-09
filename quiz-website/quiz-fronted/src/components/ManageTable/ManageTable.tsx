import { Button, DescriptionsProps, Space, Table, TableProps } from 'antd';
import BaseResponse from "../../models/BaseResponse"
import { ListResponse } from "../../utils/FetchUtils"
import useManageTableViewModel from "./ManageTable.vm"
import PageConfigs from "../../pages/PageConfigs"

export interface ManageTableProps<T> {
  listResponse: ListResponse<T>
  resourceUrl: string
  resourceKey: string
  tableHeads: TableProps<T>['columns']
  entityDetails: (data : T) => DescriptionsProps['items']
}

function ManageTable<T extends BaseResponse>(props: ManageTableProps<T>) {
  const {
    listResponse,
    tableHeads= [],
    onSelectChange,
    activePage,
    selections,
    handleViewEntityButton,
    handleDeleteEntityButton,
  } = useManageTableViewModel<T>(props)

  const columns: TableProps<T>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    ...tableHeads,
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleViewEntityButton(record.id)}>Details</a>
          <a>Edit</a>
          <Button danger onClick={() => handleDeleteEntityButton(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ]

  const rowSelection = {
    selectedRowKeys: selections[activePage],
    onChange: onSelectChange
  }

  return (
    <>
      <strong>{`Selected ${
        Object.values(selections).reduce((acc: number, curr) => acc + curr.length, 0)
      } item`}</strong>
      <Table
        rowSelection={rowSelection}
        rowKey={PageConfigs.rowKey}
        pagination={false}
        bordered
        columns={columns}
        dataSource={listResponse.content} />
    </>
  )
}

export default ManageTable