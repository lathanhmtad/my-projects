import { Badge, Button, DescriptionsProps, Image, Space, Table, TableProps } from 'antd';
import { ListResponse } from '../../utils/FetchUtils';
import useManageTableViewModel from '../../components/ManageTable/ManageTable.vm';
import PageConfigs from '../../pages/PageConfigs';
import { QuizQuestionResponse } from '../../models/Question';
import { QuizAnswerResponse } from '../../models/Answer';
import React from 'react';
import QAConfigs from './Q&AConfigs';

interface QAManageTableProps {
  listResponse: ListResponse<QuizQuestionResponse>;
  resourceUrl: string;
  resourceKey: string;
  tableHeads: TableProps<QuizQuestionResponse>['columns'];
  entityDetails: (data: QuizQuestionResponse) => DescriptionsProps['items'];
}

function QAManageTable(props: QAManageTableProps) {
  const {
    listResponse,
    onSelectChange,
    activePage,
    selections,
    handleViewEntityButton,
    handleDeleteEntityButton,
  } = useManageTableViewModel<QuizQuestionResponse>(props);

  const firstLevelColumns: TableProps<QuizQuestionResponse>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    { title: 'Câu hỏi', dataIndex: 'description', key: 'description' },
    {
      title: 'Hình ảnh', dataIndex: 'image', key: 'image',
      render: image => image === null || image === '' ? 'Không có' : <Image
        width={100}
        src={image}
      />,
    },
    { title: 'Tên bài quiz', dataIndex: 'quizName', key: 'quizName' },
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
  ];

  const secondLevelColumns: TableProps<QuizAnswerResponse>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    { title: 'Câu trả lời', dataIndex: 'description', key: 'description' },
    {
      title: 'Đáp án', dataIndex: 'correctAnswer', key: 'correctAnswer',
      render: (correctAnswer) => <Badge status={correctAnswer ? 'success' : 'error'}
                                        text={correctAnswer ? 'Đúng' : 'Sai'}/>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleViewEntityButton(record.id, QAConfigs.resourceUrlAnswer, QAConfigs.resourceKeyAnswer)}>Details</a>
          <a>Edit</a>
          <Button danger onClick={() => handleDeleteEntityButton(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const firstExpandedRow = (record: QuizQuestionResponse) => {
    return (
      <Table
        rowKey={PageConfigs.rowKey}
        columns={secondLevelColumns}
        dataSource={record.answers}
        pagination={false}
      />
    );
  };

  const rowSelection = {
    selectedRowKeys: selections[activePage],
    onChange: onSelectChange
  };

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
        expandable={{
          expandedRowRender: firstExpandedRow,
          defaultExpandAllRows: false
        }}
        columns={firstLevelColumns}
        dataSource={listResponse.content}/>
    </>
  );
}

export default QAManageTable;