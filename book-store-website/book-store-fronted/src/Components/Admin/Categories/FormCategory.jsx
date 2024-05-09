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

import { createNewCategory, fetchCategoriesTree } from '../../../redux/slices/categories/categoryThunk'

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })


const FormCategory = () => {
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewOpen, setPreviewOpen] = useState(false)
    const [uploadedImage, setUploadedImage] = useState([])

    const editableCategory = useSelector(state => state.category.categoryDetailsWithId)
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

        if (_.isEmpty(editableCategory)) {
            // create category
            dispatch(createNewCategory(formData))
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
                        id: editableCategory.id,
                        name: editableCategory.name
                    }
                }
            >
                {!_.isEmpty(editableCategory) &&
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
                    label="Select parent"
                    name="parentId"
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
                        treeDefaultExpandAll
                        placeholder="Please select parent"
                        allowClear
                        treeData={treeCategories}
                    />
                </Form.Item>

                <Form.Item
                    label="Upload"
                    name="imageFile"
                >
                    <Upload
                        {...fileProps}
                    >
                        {uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="enabled"
                    initialValue="true"
                >
                    <Radio.Group>
                        <Radio value="true">Enabled</Radio>
                        <Radio value="false">Disabled</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button type="primary"
                        block
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
export default FormCategory