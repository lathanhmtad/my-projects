import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PlusOutlined } from '@ant-design/icons'
import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Modal,
    Radio,
    Row,
    Typography,
    Upload,
} from 'antd'

import { createNewUser, updateUser } from '../../../redux/slices/users/userThunk'

import _ from 'lodash'
import { fetchRoles } from '../../../redux/slices/roleSlice'

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })


const FormUser = () => {
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewOpen, setPreviewOpen] = useState(false)
    const [uploadedImage, setUploadedImage] = useState([])

    const {
        userDetailsWithId: editableUser,
        loading
    } = useSelector(state => state.user)
    const roles = useSelector(state => state.role.roles)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRoles())
        if (!_.isEmpty(editableUser)) {
            setUploadedImage([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: editableUser.photo,
                }
            ])
        }
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
            else if (key === 'password') {
                if (!_.isEmpty(value)) {
                    formData.append(key, value)
                }
            }
            else {
                formData.append(key, value)
            }
        }

        if (_.isEmpty(editableUser)) {
            // create user
            dispatch(createNewUser(formData))
        }
        else {
            // update user
            dispatch(updateUser({
                userId: editableUser.id,
                data: formData
            }))
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
                        id: editableUser.id,
                        email: editableUser.email,
                        fullName: editableUser.fullName,
                        roleIds: editableUser.roles?.map(item => item.id)
                    }
                }
            >
                {!_.isEmpty(editableUser) &&
                    <Form.Item
                        label="Id"
                        name="id"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input
                            disabled
                        />
                    </Form.Item>}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'Email invalid!'
                        }
                    ]}
                    validateDebounce={700}
                >
                    <Input
                    />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: _.isEmpty(editableUser) ? true : false,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder={!_.isEmpty(editableUser) ? "If you don't need it, skip it" : ''}
                    />
                </Form.Item>
                <Form.Item
                    label="Full name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Roles"
                    name="roleIds"
                    rules={[
                        {
                            required: true,
                            message: 'Please select roles!',
                        }
                    ]}
                >
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                    >
                        <Row gutter={[0, 16]}>
                            {roles.map(item => <Col key={item.id} span={24}>
                                <Checkbox value={item.id}>{item.name} - {item.description}</Checkbox>
                            </Col>)}
                        </Row>
                    </Checkbox.Group>
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
                    initialValue={!_.isEmpty(editableUser) ? `${editableUser.enabled}` : "true"}
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
                        loading={loading}
                        disabled={false}
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
export default FormUser