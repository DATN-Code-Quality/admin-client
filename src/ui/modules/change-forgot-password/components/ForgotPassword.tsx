import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Result, message } from 'antd';

import { useAuth } from '~/adapters/appService/auth.service';
import Logo from '~/ui/assets/images/logo.png';
import Card from '~/ui/shared/card';
import '../containers/Login.less';

function ForgotPassword() {
  const { forgotPassword } = useAuth();

  const [isDone, setIsDone] = React.useState(false);

  const onFinish = async (values: any) => {
    try {
      await forgotPassword(values);
      setIsDone(true);
    } catch (error) {
      // message.error((error as any).message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Layout className="cms-layout-app cms-layout-app-login">
      <Card className="card-form-login" bodyClassName="card-form-login__body">
        {!isDone ? (
          <>
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
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-button"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </>
        ) : (
          <Result
            status="success"
            title="Reset Password Request Sent!"
            subTitle="Please check your email for further instructions."
          />
        )}
      </Card>
    </Layout>
  );
}

export default ForgotPassword;
