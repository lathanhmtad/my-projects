import React, { useEffect, useState } from 'react';

import useGetAllApi from '../../hooks/use-get-all-api';

import ManageHeader from '../../components/ManageHeader/ManageHeader';
import ManageHeaderButtons from '../../components/ManageHeaderButtons/ManageHeaderButtons';
import ManageHeaderTitle from '../../components/ManageHeaderTitle/ManageHeaderTitle';
import ManageMain from '../../components/ManageMain/ManageMain';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import ManageTable from '../../components/ManageTable';

import { ParticipantResponse } from '../../models/Participant';
import { ListResponse } from '../../utils/FetchUtils';

import PageConfigs from '../PageConfigs';
import ParticipantConfigs from './ParticipantConfigs';
import ManagePagination from '../../components/ManagePagination/ManagePagination';
import useResetManagePageState from '../../hooks/use-reset-manage-page-state';
import { Badge, DescriptionsProps, Image, TableProps, Tag } from 'antd';

function ParticipantManage(): React.JSX.Element {

  useResetManagePageState();

  const {
    isLoading,
    data: listResponse = PageConfigs.initListResponse as ListResponse<ParticipantResponse>
  } = useGetAllApi<ParticipantResponse>(ParticipantConfigs.resourceUrl, ParticipantConfigs.resourceKey);

  const tableHeads: TableProps<ParticipantResponse>['columns'] = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'enabled',
      key: 'enabled',
      render: enabled => <Tag
        color={`${enabled ? 'geekblue' : 'red'}`}>{enabled ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</Tag>
    }
  ];

  const entityDetails = (data: ParticipantResponse): DescriptionsProps['items'] => [
    {
      key: 'id',
      label: 'Id',
      children: data.id,
      span: 24
    },
    {
      key: 'username',
      label: 'Tên đăng nhập',
      children: data.username,
      span: 24
    },
    {
      key: 'fullName',
      label: 'Họ và tên',
      children: data.fullName,
      span: 24
    },
    {
      key: 'email',
      label: 'Email',
      children: data.email,
      span: 24
    },
    {
      key: 'role',
      label: 'Vai trò',
      children: data.role,
      span: 24
    },
    {
      key: 'avatar',
      label: 'Ảnh đại diện',
      children: <Image
        width={100}
        src={data.avatar}
      />,
      span: 24
    },
    {
      key: 'status',
      label: 'Trạng thái',
      children: <Badge status={data.enabled ? 'success' : 'error'}/>,
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
        <ManageHeaderTitle
          title={ParticipantConfigs.manageTitle}
        />
        <ManageHeaderButtons
          listResponse={listResponse}
          resourceUrl={ParticipantConfigs.resourceUrl}
          resourceKey={ParticipantConfigs.resourceKey}
        />
      </ManageHeader>

      <SearchPanel/>

      <ManageMain
        listResponse={listResponse}
        isLoading={isLoading}
      >
        <ManageTable
          listResponse={listResponse}
          resourceUrl={ParticipantConfigs.resourceUrl}
          resourceKey={ParticipantConfigs.resourceKey}
          tableHeads={tableHeads}
          entityDetails={entityDetails}
        />
      </ManageMain>

      <ManagePagination
        listResponse={listResponse}
      />
    </div>
  );
}

export default ParticipantManage;