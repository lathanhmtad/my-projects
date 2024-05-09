import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Space, Table, Typography, Popconfirm, Tag, Image } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { setCurrentPage } from '../../../redux/slices/brands/brandSlice'

import { BRANDS_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant'
import { deleteBrand, fetchBrands } from '../../../redux/slices/brands/brandThunk'

const TableBrand = () => {
    const { currentPage, brands, totalElements, loading } = useSelector(state => state.brand)
    const dispatch = useDispatch()

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Logo',
            dataIndex: 'logo',
            render: (logo) => <Image width={50} src={logo} />
        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            render: (categories) => categories.map((item, index) => <Tag key={index}>{item}</Tag>)
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <>
                    <Space size='large'>
                        <Typography.Link>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                            onConfirm={() => dispatch(deleteBrand(record.id))}
                        >
                            <Typography.Link type='danger'>Delete</Typography.Link>
                        </Popconfirm>
                        <Typography.Link
                            type='warning'
                        >
                            Details
                        </Typography.Link>
                    </Space>
                </>
            )
        }
    ]

    useEffect(() => {
        dispatch(fetchBrands({ page: currentPage, size: BRANDS_MAX_ITEMS_PER_PAGE }))
    }, [currentPage])

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            console.log('selectedRowKeys changed: ', newSelectedRowKeys)
            setSelectedRowKeys(newSelectedRowKeys)
        },
    }

    return (
        <Table
            loading={loading}
            rowKey="id"
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={brands}
            pagination={
                {
                    current: currentPage,
                    total: totalElements,
                    pageSize: BRANDS_MAX_ITEMS_PER_PAGE,
                    onChange: page => {
                        dispatch(setCurrentPage(page))
                    }
                }
            }
        />
    )
}
export default TableBrand