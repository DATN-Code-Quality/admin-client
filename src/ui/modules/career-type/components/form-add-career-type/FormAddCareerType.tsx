import React, { useCallback, useEffect, useState } from "react";

import { Button, Form, message, Space } from "antd";
import { useNavigate } from "react-router-dom";

import { useCareerType } from "src/adapters/appService/careerType.service";

import FormBuilder from "src/ui/shared/forms";
import Loading from "src/ui/shared/loading";

import ROUTE from "src/constant/routes";

import { metaFormAddCareerType } from "./props";

const FormAddCareerType = ({ id }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { getDetailCareerType, createCareerType, updateCareerType } =
    useCareerType();
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmitFail = (errMsg) => (err) => {
    console.log("err submit", err);
    message.error(errMsg);
    setLoading(false);
  };

  const handleSubmitSuccess = (successMsg) => () => {
    message.success(successMsg);
    navigate(ROUTE.CAREER_TYPE.LIST);
  };

  const handleSubmit = useCallback((values) => {
    setLoading(true);
    const dataSubmit = {
      ...values,
    };
    if (id) {
      dataSubmit.id = id;
      updateCareerType(dataSubmit)
        .then(handleSubmitSuccess("Cập nhật Ngành nghề thành công!"))
        .catch(handleSubmitFail("Cập nhật Ngành nghề thất bại!"));
    } else {
      createCareerType(dataSubmit)
        .then(handleSubmitSuccess("Cập nhật Ngành nghề thành công!"))
        .catch(handleSubmitFail("Cập nhật Ngành nghề thất bại!"));
    }
  }, []);

  useEffect(() => {
    if (id) {
      getDetailCareerType(id).then((data) => {
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
          <FormBuilder meta={metaFormAddCareerType} />
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

export default FormAddCareerType;
