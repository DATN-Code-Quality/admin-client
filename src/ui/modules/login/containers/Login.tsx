import React from "react";

import "./Login.less";

import { Button, Form, Input, Layout, message, Tabs } from "antd";

import { useAuth } from "src/adapters/appService/auth.service";

import FormBuilder from "src/ui/shared/forms";

import { metaFormLogin } from "./props";

const Login = () => {
  const { loginMicrosoft } = useAuth();
  const onFinish = (values: any) => {
    loginMicrosoft();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout className="cms-layout-app cms-layout-app-login">
      <Tabs defaultActiveKey="2">
        <Tabs.TabPane tab="Login now" key="2">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <FormBuilder meta={metaFormLogin} />
            <div className="login-action-container">
              <Button
                className="login-action-item"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                className="login-action-item"
                type="primary"
                onClick={loginMicrosoft}
              >
                Microsoft 365
              </Button>
            </div>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Login;
