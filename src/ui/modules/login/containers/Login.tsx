import React, { useEffect } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Layout, message, Tabs, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '~/adapters/appService/auth.service';
import { authSelector } from '~/adapters/redux/selectors/auth';
import ROUTE from '~/constant/routes';
import ZaloLogo from '~/ui/assets/images/icon-zalo.png';
import Logo from '~/ui/assets/images/logo.png';
import { metaFormLogin } from '~/ui/modules/login/containers/props';
import Card from '~/ui/shared/card';
import FormBuilder from '~/ui/shared/forms/FormBuilder';
// import ZaloLogo from '~/ui/assets/images/zalo-logo.svg';

import './Login.less';

function Login() {
  const { loginMicrosoft } = useAuth();
  const navigate = useNavigate();
  const { roles, name } = useSelector(authSelector);
  const onFinish = (values: any) => {
    loginMicrosoft(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (roles && name) {
      navigate(ROUTE.DASHBOARD);
    }
  }, []);

  return (
    <Layout className="cms-layout-app cms-layout-app-login">
      <Card className="card-form-login" bodyClassName="card-form-login__body">
        <div className="logo-login-container">
          {/* <img className="logo-login" src={Logo} /> */}
        </div>
        <div className="layout-form-login">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Login
              </Button>
            </Form.Item>
          </Form>
          <Button
            type="primary"
            ghost
            onClick={loginMicrosoft}
            className="login-button login-button-microsoft"
          >
            Login with Microsoft 365
          </Button>
        </div>
        {/* <Button type="primary" onClick={loginZalo} className="login-button">
          Login with Microsoft 365
        </Button> */}
        {/* <div className="zalo-wrap-img">
          <span className="text-login-with">Login with:</span>
          <img className="icon" alt="" src={ZaloLogo} onClick={loginZalo} />
        </div> */}
      </Card>
    </Layout>
  );
}

export default Login;
