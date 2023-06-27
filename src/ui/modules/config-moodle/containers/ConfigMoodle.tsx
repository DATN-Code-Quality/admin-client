import React, { useEffect, useState } from 'react';

import { Button, Form, Modal, PageHeader, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { metaFormConfigMoodle } from './props';

import { useMoodle } from '~/adapters/appService/moodle.service';
import ROUTE from '~/constant/routes';
import Card from '~/ui/shared/card';
import FormBuilder from '~/ui/shared/forms';
import './ConfigMoodle.less';
import Loading from '~/ui/shared/loading';

function ConfigMoodle() {
  const [form] = Form.useForm();
  const { checkConnect, createConnect } = useMoodle();
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmitFail = (errMsg) => (err) => {
    message.error(errMsg);
    setLoading(false);
    // setViewMode(true);
  };

  const handleSubmitSuccess = (successMsg) => () => {
    message.success(successMsg);
    const url = ROUTE.DASHBOARD;
    navigate(url);
    setLoading(false);
    // setViewMode(true);
  };

  const handleSubmit = (values) => {
    // TODO: handle submit
    setLoading(true);
    const dataSubmit = {
      ...values,
    };
    createConnect(dataSubmit)
      .then(handleSubmitSuccess('Config successfully!'))
      .catch(handleSubmitFail('Config failed!'))
      .finally(() => setLoading(false));
  };

  const handleCloseConnectModal = () => {
    navigate(ROUTE.DASHBOARD);
  };

  const handleCheckConnect = async () => {
    setLoading(true);
    try {
      const res = await checkConnect();
      setIsConnect(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCheckConnect();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Card className="card-edit-view card-config-moodle">
        <PageHeader
          className="site-page-header"
          title="Moodle Configuration"
          ghost
        />
        {!isConnect && (
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="form-edit-view"
          >
            <div className="form_group mb-4">
              <FormBuilder form={form} meta={metaFormConfigMoodle()} />
            </div>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  Save Changes
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Card>
      <Modal
        open={isConnect}
        title="Moodle Configuration"
        onCancel={handleCloseConnectModal}
        footer={[
          <Button key="close" type="primary" onClick={handleCloseConnectModal}>
            Ok
          </Button>,
        ]}
      >
        <div className="text">
          <p className="mb-4">
            Configuration for Moodle has been established! You can now use the
            API from Moodle.
          </p>
        </div>
      </Modal>
    </>
  );
}

export default ConfigMoodle;
