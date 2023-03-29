import React, { useCallback, useEffect, useState } from 'react';

import { Button, Form, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import { metaFormAddCourse } from './props';

import { useCourse } from '~/adapters/appService/course.service';
import ROUTE from '~/constant/routes';
import FormBuilder from '~/ui/shared/forms';
import Loading from '~/ui/shared/loading';

const FormAddCourse = ({ id }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { getDetailCourse, createCourse, updateCourse } = useCourse();
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmitFail = (errMsg) => (err) => {
    console.log('err submit', err);
    message.error(errMsg);
    setLoading(false);
  };

  const handleSubmitSuccess = (successMsg) => () => {
    message.success(successMsg);
    navigate(ROUTE.COURSE.LIST);
  };

  const handleSubmit = useCallback((values) => {
    setLoading(true);
    const dataSubmit = {
      ...values,
    };
    if (id) {
      dataSubmit.id = id;
      updateCourse(dataSubmit)
        .then(handleSubmitSuccess('Cập nhật Ngành nghề thành công!'))
        .catch(handleSubmitFail('Cập nhật Ngành nghề thất bại!'));
    } else {
      createCourse(dataSubmit)
        .then(handleSubmitSuccess('Cập nhật Ngành nghề thành công!'))
        .catch(handleSubmitFail('Cập nhật Ngành nghề thất bại!'));
    }
  }, []);

  useEffect(() => {
    if (id) {
      getDetailCourse(id).then((res) => {
        console.log(res);
        form.setFieldsValue(res.data);
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
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="form-edit-view"
        >
          <FormBuilder meta={metaFormAddCourse()} />
          <Form.Item>
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

export default FormAddCourse;
