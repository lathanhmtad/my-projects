import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PlusOutlined } from '@ant-design/icons'
import {
    Button,
    Form,
    Input,
    Modal,
    Radio,
    TreeSelect,
    Typography,
    Upload,
} from 'antd'

import _ from 'lodash'

import { fetchCategoriesTree } from '../../../redux/slices/categories/categoryThunk'
import { createNewBrand } from '../../../redux/slices/brands/brandThunk'

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })


const FormBrand = () => {
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewOpen, setPreviewOpen] = useState(false)
    const [uploadedImage, setUploadedImage] = useState([])

    const editableBrand = useSelector(state => state.brand.brandDetailsWithId)
    const loading = useSelector(state => state.brand.loading)
    const treeCategories = useSelector(state => state.category.treeSelect)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoriesTree())
    }, [])

    const fileProps = {
        name: "file",
        multiple: false,
        listType: "picture-card",
        maxCount: 1,
        fileList: uploadedImage,
        beforeUpload: () => {
            return false
        },
        onChange: ({ fileList: newUploadedImage }) => setUploadedImage(newUploadedImage),
        onPreview: async (file) => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj)
            }
            setPreviewImage(file.url || file.preview)
            setPreviewOpen(true)
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
        }
    }

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <Typography.Link><PlusOutlined /></Typography.Link>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                <Typography.Link>Upload</Typography.Link>
            </div>
        </button>
    )

    const onFinish = (values) => {
        const formData = new FormData()

        for (const [key, value] of Object.entries(values)) {
            if (key === 'imageFile') {
                if (value && !_.isEmpty(value.fileList))
                    formData.append(key, value.file)
            }
            else {
                formData.append(key, value)
            }
        }

        if (_.isEmpty(editableBrand)) {
            // create category
            dispatch(createNewBrand(formData))
        }
        else {
            // update category
            // dispatch(updateCate({
            //     userId: editableCategory.id,
            //     data: formData
            // }))
        }
    }

    return (
        <>
            <Form
                disabled={loading}
                size='large'
                labelAlign='left'
                labelCol={{
                    span: 3,
                }}
                wrapperCol={{
                    span: 24,
                }}
                layout="horizontal"
                onFinish={onFinish}
                autoComplete='off'
                initialValues={
                    {
                        id: editableBrand.id,
                        name: editableBrand.name
                    }
                }
            >
                {!_.isEmpty(editableBrand) &&
                    <Form.Item
                        label="Id"
                        name="id"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            disabled
                        />
                    </Form.Item>}
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                    validateDebounce={700}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Categories"
                    name="categoryIds"
                    rules={[
                        {
                            required: true,
                            message: 'Please select!',
                        },
                    ]}
                >
                    <TreeSelect
                        size='large'
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                        }}
                        multiple
                        treeDefaultExpandAll
                        placeholder="Please select parent"
                        allowClear
                        treeData={treeCategories}
                    />
                </Form.Item>

                <Form.Item
                    label="Logo"
                    name="imageFile"
                    rules={[
                        {
                            required: true,
                            message: 'Please upload logo!',
                        },
                    ]}
                >
                    <Upload
                        {...fileProps}
                    >
                        {uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button type="primary"
                        disabled={false}
                        block
                        loading={loading}
                        htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    )
}
export default FormBrand