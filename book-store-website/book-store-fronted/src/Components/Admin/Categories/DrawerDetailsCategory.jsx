import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Badge, Descriptions, Drawer, Image, Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons'

import { closeDrawerDetails } from '../../../redux/slices/categories/categorySlice';

const DrawerDetailsCategory = () => {
    const { showDrawerDetails: open, categoryDetailsWithId: categoryDetails } = useSelector(state => state.category)
    const dispatch = useDispatch()

    const items = [
        {
            key: 'id',
            label: 'Id',
            children: categoryDetails.id
        },
        {
            key: 'name',
            label: 'Name',
            children: categoryDetails.name
        },
        {
            key: 'enabled',
            label: 'Status',
            children: <Badge status={categoryDetails.enabled ? 'success' : 'error'} text={categoryDetails.enabled ? 'Enabled' : 'Disabled'} />
        },
        {
            key: 'createdDate',
            label: 'Created date',
            children: categoryDetails.createdDate
        },
        {
            key: 'createdBy',
            label: 'Created by',
            children: categoryDetails.createdBy
        },
        {
            key: 'lastModifiedDate',
            label: 'Last modified date',
            children: categoryDetails.lastModifiedDate
        },
        {
            key: 'lastModifiedBy',
            label: 'Last modified by',
            children: categoryDetails.lastModifiedBy
        },
        {
            span: 24,
            key: 'photo',
            label: 'Photo',
            children: <Image
                width={50}
                src={categoryDetails.image}
            />
        },
        {
            key: 'children',
            label: 'Subcategory',
            children: categoryDetails.hasChildren ? <Tree
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandAll
                treeData={categoryDetails.children}
            /> : 'No subcategory'
        },
    ]

    const onClose = () => {
        dispatch(closeDrawerDetails())
    };
    return (
        <Drawer
            title="Category details"
            placement="left"
            closable={true}
            onClose={onClose}
            size='large'
            open={open}
        >
            <Descriptions
                bordered
                layout='vertical'
                title="" items={items} />
        </Drawer>
    );
};
export default DrawerDetailsCategory;