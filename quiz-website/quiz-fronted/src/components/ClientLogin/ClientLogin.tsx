import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Form, Input, Button, Checkbox, Typography, App } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import SocialNetworks from '../SocialNetworks/SocialNetWorks';
import { LoginRequest, LoginResponse } from '../../models/Authentication';
import { useMutation } from '@tanstack/react-query';
import FetchUtils, { ErrorResponse } from '../../utils/FetchUtils';
import ResourceUrl from '../../constants/ResourceUrl';
import { ParticipantResponse } from '../../models/Participant';
import { updateAccessToken, updateParticipant, updateRefreshToken } from '../../redux/slices/authSlice';

const { Title } = Typography;

export default function ClientLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginApi = useMutation({
    mutationFn: (requestBody: LoginRequest): Promise<LoginResponse> => FetchUtils.post(ResourceUrl.LOGIN, requestBody),
  });

  const participantInfoApi = useMutation({
    mutationFn: (): Promise<ParticipantResponse> => FetchUtils.getWithToken(ResourceUrl.CLIENT_PARTICIPANT_INFO)
  });

  const onFinish = async (loginRequest: LoginRequest) => {
    setIsLoading(true);

    try {
      const loginResponse = await loginApi.mutateAsync(loginRequest);
      dispatch(updateAccessToken(loginResponse.accessToken));
      dispatch(updateRefreshToken(loginResponse.refreshToken));

      const participantResponse = await participantInfoApi.mutateAsync();
      dispatch(updateParticipant(participantResponse));

      notification.success({
        message: loginResponse.message
      });

      navigate('/')
    } catch (e: any) {
      notification.error({
        message: e.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        name="login"
        form={form}
        disabled={isLoading}
        initialValues={{
          remember: false,
        }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Title level={2} className="text-center">
          Sign in
        </Title>

        <SocialNetworks/>

        <div className="option-text">or use your account</div>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your username.',
            },
          ]}
          validateDebounce={600}
        >
          <Input placeholder="Username" size="large"/>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password.',
            }
          ]}
        >
          <Input.Password placeholder="Password" size="large"/>
        </Form.Item>

        {/*<Form.Item>*/}
        {/*  <Form.Item name="remember" valuePropName="checked" noStyle>*/}
        {/*    <Checkbox>Remember me</Checkbox>*/}
        {/*  </Form.Item>*/}

        {/*  <a className="login-form-forgot" href="#">*/}
        {/*    Forgot password?*/}
        {/*  </a>*/}
        {/*</Form.Item>*/}

        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          shape="round"
          icon={<LoginOutlined/>}
          size="large"
        >
          Sign In
        </Button>
      </Form>
    </>
  );
}