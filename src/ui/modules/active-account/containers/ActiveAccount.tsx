import React, { useEffect, useState } from 'react';

import { MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Layout, Result, Spin } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { putWithPath } from '~/adapters/api.http';
import API from '~/constant/api';
import ROUTE from '~/constant/routes';
import Card from '~/ui/shared/card';
import './ActiveAccount.less';

function ActiveAccount() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Activating...');
  const [err, setErr] = useState(false);

  const handleNextBtn = () => {
    navigate(`${ROUTE.CHANGE_FORGOT_PASSWORD}?token=${params.get('token')}`);
  };

  const activateAccount = async () => {
    setLoading(true);

    try {
      await putWithPath(API.AUTH.PUT.ACTIVE_ACCOUNT, {
        token: params.get('token'),
      });

      setErr(false);
      setStatus("Your account has been activated. Let's change your password!");
    } catch (error) {
      setStatus((error as any)?.message || 'Something went wrong!');
      setErr(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <Spin spinning={loading}>
      <Card
        className="card-form-change-password"
        bodyClassName="card-form-change-password__body"
      >
        <Result
          status="success"
          icon={err ? <MehOutlined /> : <SmileOutlined />}
          title={status}
          subTitle=""
          extra={
            err
              ? ''
              : [
                  <Button type="primary" key="console" onClick={handleNextBtn}>
                    Next
                  </Button>,
                ]
          }
        />
      </Card>
    </Spin>
  );
}

export default ActiveAccount;
