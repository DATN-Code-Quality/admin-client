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
  const { loginZalo } = useAuth();
  const navigate = useNavigate();
  const { roles, name } = useSelector(authSelector);
  const onFinish = (values: any) => {
    loginZalo(values);
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
          <img className="logo-login" src={Logo} />
        </div>
        <Button type="primary" onClick={loginZalo} className="login-button">
          {/* <img className="icon" alt="" src={ZaloLogo} onClick={loginZalo} /> */}
          Login with Zalo
        </Button>
        {/* <div className="zalo-wrap-img">
          <span className="text-login-with">Login with:</span>
          <img className="icon" alt="" src={ZaloLogo} onClick={loginZalo} />
        </div> */}
      </Card>
    </Layout>
  );
}

export default Login;
