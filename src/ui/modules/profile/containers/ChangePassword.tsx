import React, { useEffect } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '~/adapters/appService/auth.service';
import Logo from '~/ui/assets/images/logo.png';
import Card from '~/ui/shared/card';
import { getDefaultRoute } from '~/utils';
import './ChangePassword.less';

function ChangePassword() {
  const { checkProfile, login, loginMicrosoft } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      return;
    }
    await login(values);
    navigate('/', { replace: true });
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
            <Form.Item
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
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống mật khẩu!',
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu mới"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không bỏ trống mật khẩu!',
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Nhập lại mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="change-password-button"
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </Layout>
  );
}

export default ChangePassword;
