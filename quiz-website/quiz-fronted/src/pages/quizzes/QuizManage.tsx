import ManageHeader from '../../components/ManageHeader/ManageHeader';
import ManageHeaderTitle from '../../components/ManageHeaderTitle/ManageHeaderTitle';
import QuizConfigs from './QuizConfigs';
import ManageHeaderButtons from '../../components/ManageHeaderButtons';
import useResetManagePageState from '../../hooks/use-reset-manage-page-state';
import PageConfigs from '../PageConfigs';
import { ListResponse } from '../../utils/FetchUtils';
import useGetAllApi from '../../hooks/use-get-all-api';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import ManageMain from '../../components/ManageMain/ManageMain';
import ManageTable from '../../components/ManageTable';
import { QuizResponse } from '../../models/Quiz';
import { DescriptionsProps, Image, TableProps, Tag } from 'antd';
import React from 'react';
import ManagePagination from '../../components/ManagePagination/ManagePagination';

function QuizManage() {
  useResetManagePageState();

  const {
    isLoading,
    data: listResponse = PageConfigs.initListResponse as ListResponse<QuizResponse>
  } = useGetAllApi<QuizResponse>(QuizConfigs.resourceUrl, QuizConfigs.resourceKey);

  const tableHeads: TableProps<QuizResponse>['columns'] = [
    {
      title: 'Tên bài quiz',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Độ khó',
      dataIndex: 'difficulty',
      key: 'difficulty'
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      key: 'category',
      render: category => <Tag>{category.name}</Tag>
    },
  ];

  const entityDetails = (data: QuizResponse): DescriptionsProps['items'] => [
    {
      key: 'id',
      label: 'Id',
      children: data.id,
      span: 24
    },
    {
      key: 'name',
      label: 'Tên bài quiz',
      children: data.name,
      span: 24
    },
    {
      key: 'description',
      label: 'Mô tả',
      children: data.description,
      span: 24
    },
    {
      key: 'difficulty',
      label: 'Độ khó',
      children: data.difficulty,
      span: 24
    },
    {
      key: 'image',
      label: 'Hình ảnh',
      children: data.image === null || data.image === '' ? 'Không có' : <Image
        width={100}
        src={data.image}
      />,
      span: 24
    },
    {
      key: 'createdDate',
      label: 'Ngày tạo',
      children: data.createdDate,
      span: 24
    },
    {
      key: 'updatedDate',
      label: 'Cập nhập lần cuối',
      children: data.updatedDate === null ? 'Chưa có' : data.updatedDate,
      span: 24
    }
  ];

  return (
    <div>
      <ManageHeader>
        <ManageHeaderTitle title={QuizConfigs.manageTitle}/>
        <ManageHeaderButtons listResponse={listResponse} resourceUrl={QuizConfigs.resourceUrl}
                             resourceKey={QuizConfigs.resourceKey}/>
      </ManageHeader>

      <SearchPanel/>

      <ManageMain listResponse={listResponse} isLoading={isLoading}>
        <ManageTable
          listResponse={listResponse}
          resourceUrl={QuizConfigs.resourceUrl}
          resourceKey={QuizConfigs.resourceKey}
          tableHeads={tableHeads}
          entityDetails={entityDetails}/>
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </div>
  );
}

export default QuizManage;