import React, { useCallback, useEffect, useState } from "react";

import { Button, Form, message, Space } from "antd";
import { useNavigate } from "react-router-dom";

import { useCompany } from "src/adapters/appService/company.service";

import FormBuilder from "src/ui/shared/forms";
import Loading from "src/ui/shared/loading";

import ROUTE from "src/constant/routes";

import { metaFormAddCompany } from "./props";

const FormAddCompany = ({ id }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { getDetailCompany, createCompany, updateCompany } = useCompany();
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmitFail = (errMsg) => (err) => {
    console.log("err submit", err);
    message.error(errMsg);
    setLoading(false);
  };

  const handleSubmitSuccess = (successMsg) => () => {
    message.success(successMsg);
    navigate(ROUTE.COMPANY.LIST);
  };

  const handleSubmit = useCallback((values) => {
    setLoading(true);
    const dataSubmit = {
      ...values,
    };
    if (id) {
      dataSubmit.id = id;
      updateCompany(dataSubmit)
        .then(handleSubmitSuccess("Cập nhật Công ty thành công!"))
        .catch(handleSubmitFail("Cập nhật Công ty thất bại!"));
    } else {
      createCompany(dataSubmit)
        .then(handleSubmitSuccess("Cập nhật Công ty thành công!"))
        .catch(handleSubmitFail("Cập nhật Công ty thất bại!"));
    }
  }, []);

  useEffect(() => {
    if (id) {
      getDetailCompany(id).then((data) => {
        form.setFieldsValue(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form form={form} onFinish={handleSubmit} className="site-page-content">
          <FormBuilder meta={metaFormAddCompany} />
          <Form.Item wrapperCol={{ offset: 2, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                Lưu thông tin
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default FormAddCompany;
