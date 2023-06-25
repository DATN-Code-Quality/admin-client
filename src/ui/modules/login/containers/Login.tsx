import React, { useEffect } from 'react';

import { LockOutlined, UserOutlined, WindowsFilled } from '@ant-design/icons';
import { Button, Form, Input, Layout, message } from 'antd';
import MicrosoftLogin from 'react-microsoft-login';
import { useNavigate } from 'react-router-dom';

import ForgotPassword from '../components/ForgotPassword';

import { useAuth } from '~/adapters/appService/auth.service';
import Logo from '~/ui/assets/images/logo.png';
import Card from '~/ui/shared/card';
import { getDefaultRoute } from '~/utils';

import './Login.less';

function Login() {
  const { checkProfile, login, loginMicrosoft } = useAuth();
  const navigate = useNavigate();

  const [isForgotPassword, setIsForgotPassword] = React.useState(false);

  const onFinish = async (values: any) => {
    await login(values);
    navigate('/', { replace: true });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  useEffect(() => {
    checkProfile().then((res) => {
      const defaultRoute = getDefaultRoute([res?.data?.role]);
      navigate(defaultRoute, { replace: true });
    });
  }, []);

  if (isForgotPassword) {
    return <ForgotPassword />;
  }

  return (
    <Layout className="cms-layout-app cms-layout-app-login">
      <Card className="card-form-login" bodyClassName="card-form-login__body">
        <div className="logo-login-container">
          <img className="logo-login" src={Logo} />
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
                },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
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
                placeholder="Password"
              />
            </Form.Item>

            <Button
              type="text"
              style={{ width: '100%', marginBottom: 5 }}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </Button>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Login
              </Button>
            </Form.Item>
          </Form>
          <MicrosoftLogin
            authCallback={async (err, data) => {
              if (err) return;
              try {
                await loginMicrosoft({ token: data?.accessToken });
                navigate('/', { replace: true });
              } catch (error) {
                message.error((error as any).message);
              }
            }}
            clientId="cd6968a3-3b9b-4658-8e2d-ce846578e092"
            debug
            redirectUri="http://localhost:3000"
            prompt="login"
          >
            <Button
              type="primary"
              ghost
              className="login-button login-button-microsoft"
              icon={<WindowsFilled />}
            >
              Log in with Microsoft
            </Button>
          </MicrosoftLogin>
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
