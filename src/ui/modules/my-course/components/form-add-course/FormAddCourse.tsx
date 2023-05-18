import React, { useCallback, useEffect, useState } from 'react';

import { Button, Form, Input, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import { metaFormAddCourse } from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { MAP_USER_STATUS } from '~/constant';
import ROUTE from '~/constant/routes';
import FormBuilder from '~/ui/shared/forms';
import Loading from '~/ui/shared/loading';
import { formatDate, getMappingLabelByValue } from '~/utils';

const FormAddCourse = ({ course, id, initialViewMode = false }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { getDetailCourse, importCourses: createCourse, updateCourse } = useCourse();
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<boolean>(initialViewMode);
  const [formValues, setFormValues] = useState<any>({});

  const handleSubmitFail = (errMsg) => (err) => {
    console.log('err submit', err);
    message.error(errMsg);
    setLoading(false);
    setViewMode(true);
  };

  const handleSubmitSuccess = (successMsg) => () => {
    message.success(successMsg);
    // navigate(ROUTE.COURSE.LIST);
    setLoading(false);
    setViewMode(true);
  };

  const handleSubmit = useCallback((values) => {
    message.success('Cập nhật thành công!');
    // TODO: remove hardcode
    if (!initialViewMode) {
      navigate(ROUTE.COURSE.LIST);
      return;
    }
    setViewMode(true);
    return;

    // TODO: handle submit
    setLoading(true);
    const dataSubmit = {
      ...values,
    };
    if (id) {
      dataSubmit.id = id;
      updateCourse(dataSubmit)
        .then(handleSubmitSuccess('Cập nhật Ngành nghề thành công!'))
        .catch(handleSubmitFail('Cập nhật Ngành nghề thất bại!'))
        .finally(() => setLoading(false));
    } else {
      createCourse(dataSubmit)
        .then(handleSubmitSuccess('Cập nhật Ngành nghề thành công!'))
        .catch(handleSubmitFail('Cập nhật Ngành nghề thất bại!'))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleEditCourse = () => {
    setViewMode(false);
  };

  useEffect(() => {
    if (course) {
      form.setFieldsValue(course);
      setFormValues(course);
    } else {
      setLoading(false);
    }
  }, [course, id]);

  return (
    <>
      {loading && <Loading />}
      {viewMode && (
        <Form form={form} className="form-edit-view view-mode">
          <div className="group_field">
            <label>Tên khoá học: </label>
            <div className="field_value">{formValues?.name}</div>
          </div>
          <div className="group_field">
            <label>Mô tả: </label>
            <div
              className="field_value"
              dangerouslySetInnerHTML={{
                __html: formValues?.summary || 'Chưa cập nhật',
              }}
            />
          </div>
          <div className="group_field">
            <label>Ngày bắt đầu: </label>
            <div className="field_value">
              {formatDate(formValues?.startAt, 'vi-VN', 'DD/MM/YYYY')}
            </div>
          </div>
          <div className="group_field">
            <label>Ngày kết thúc: </label>
            <div className="field_value">
              {formatDate(formValues?.endAt, 'vi-VN', 'DD/MM/YYYY')}
            </div>
          </div>
          {/* <Form.Item>
            <Space>
              <Button type="primary" size="large" onClick={handleEditCourse}>
                Edit thông tin
              </Button>
            </Space>
          </Form.Item> */}
        </Form>
      )}
      {!viewMode && (
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
