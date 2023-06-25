import React, { useState } from 'react';

import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Typography, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '~/adapters/appService/auth.service';
import Logo from '~/ui/assets/images/logo.png';
import Card from '~/ui/shared/card';
import './ChangeForgotPassword.less';

function ChangeForgotPassword() {
  const { changePasswordV2 } = useAuth();

  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const onFinish = async (values: any) => {
    const { newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error('Confirm password is not match!');
      return;
    }

    try {
      await changePasswordV2(params.get('token') || '', { newPassword });
      message.success('Change password successfully!');
      navigate('/', { replace: true });
    } catch (error) {
      setErr((error as any)?.message || 'Something went wrong!');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="cms-layout-app cms-layout-app-change-password">
      <Card
        className="card-form-change-password"
        bodyClassName="card-form-change-password__body"
      >
        <div className="logo-change-password-container">
          <img className="logo-change-password" src={Logo} />
        </div>
        <div className="layout-form-change-password">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* <Form.Item
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống!',
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu cũ"
              />
            </Form.Item> */}
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please enter your new password!',
                },
                {
                  pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message: (
                    <ul>
                      Password must contain:
                      <li>At least one upper case</li>
                      <li>At least one lower case</li>
                      <li>At least one digit</li>
                      <li>At least one special character </li>
                      <li>Minimum 8 in length</li>
                    </ul>
                  ),
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="New password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your new password!',
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm new password"
              />
            </Form.Item>
            <Typography.Text type="danger">{err}</Typography.Text>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="change-password-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </Layout>
  );
}

export default ChangeForgotPassword;
