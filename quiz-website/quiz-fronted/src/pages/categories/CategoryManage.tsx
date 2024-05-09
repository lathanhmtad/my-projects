import useGetAllApi from "../../hooks/use-get-all-api"
import ManageHeader from "../../components/ManageHeader/ManageHeader"
import ManageHeaderButtons from "../../components/ManageHeaderButtons/ManageHeaderButtons"
import ManageHeaderTitle from "../../components/ManageHeaderTitle/ManageHeaderTitle"
import ManageMain from "../../components/ManageMain/ManageMain"
import SearchPanel from "../../components/SearchPanel/SearchPanel"

import { CategoryResponse } from "../../models/Category"
import { ListResponse } from "../../utils/FetchUtils"

import PageConfigs from "../PageConfigs"
import CategoryConfigs from "./CategoryConfigs"
import ManageTable from "../../components/ManageTable/ManageTable"
import ManagePagination from '../../components/ManagePagination/ManagePagination';
import useResetManagePageState from '../../hooks/use-reset-manage-page-state';
import { Badge, DescriptionsProps, Image, TableProps, Tag } from 'antd';
import React from 'react';

function CategoryManage() {

    useResetManagePageState()

    const {
        isLoading,
        data: listResponse = PageConfigs.initListResponse  as ListResponse<CategoryResponse>
    } = useGetAllApi<CategoryResponse>(CategoryConfigs.resourceUrl, CategoryConfigs.resourceKey)

    const tableHeads : TableProps<CategoryResponse>['columns'] = [
      {
        title: 'Tên danh mục',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Trạng thái',
        dataIndex: 'enabled',
        key: 'enabled',
        render: enabled => <Tag color={`${enabled ? 'geekblue' : 'red'}`}>{enabled ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</Tag>
      }
    ]

    const entityDetails = (data : CategoryResponse) : DescriptionsProps['items'] => [
      {
        key: 'id',
        label: 'Id',
        children: data.id,
        span: 24
      },
      {
        key: 'name',
        label: 'Tên danh mục',
        children: data.name,
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
        key: 'status',
        label: 'Trạng thái',
        children: <Badge status={data.enabled ? 'success' : 'error'} />,
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
    ]

    return (
        <div>
            <ManageHeader>
                <ManageHeaderTitle
                    title={CategoryConfigs.manageTitle}
                />
                <ManageHeaderButtons
                    listResponse={listResponse}
                    resourceUrl={CategoryConfigs.resourceUrl}
                    resourceKey={CategoryConfigs.resourceKey}
                />
            </ManageHeader>

            <SearchPanel />

            <ManageMain
                listResponse={listResponse}
                isLoading={isLoading}
            >
                <ManageTable
                    listResponse={listResponse}
                    resourceUrl={CategoryConfigs.resourceUrl}
                    resourceKey={CategoryConfigs.resourceKey}
                    tableHeads={tableHeads}
                    entityDetails={entityDetails}
                />
            </ManageMain>

          <ManagePagination listResponse={listResponse} />

        </div>
    )
}

export default CategoryManage