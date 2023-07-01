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
  const { getDetailCourse, importCourses: createCourse } = useCourse();
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<boolean>(initialViewMode);
  const [formValues, setFormValues] = useState<any>({});

  const handleSubmitFail = (errMsg) => (err) => {
    console.log('err submit', err);
    message.error(errMsg);
    setLoading(false);
    // setViewMode(true);
  };

  const handleSubmitSuccess = (successMsg) => () => {
    message.success(successMsg);
    navigate(ROUTE.COURSE.LIST);
    setLoading(false);
    // setViewMode(true);
  };

  const handleSubmit = useCallback((values) => {
    setLoading(true);
    const dataSubmit = {
      ...values,
      startAt: values.startAt.toISOString(),
      endAt: values.endAt.toISOString(),
    };
    if (id) {
      dataSubmit.id = id;
      setLoading(false);
      // updateCourse(dataSubmit)
      //   .then(handleSubmitSuccess('Edit Course successfully!'))
      //   .catch(handleSubmitFail('Edit Course failed!'))
      //   .finally(() => setLoading(false));
    } else {
      createCourse([dataSubmit])
        .then(handleSubmitSuccess('Create Course successfully!'))
        .catch(handleSubmitFail('Create Course failed!'))
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
            <label>Course Name: </label>
            <div className="field_value">{formValues?.name}</div>
          </div>
          <div className="group_field">
            <label>Summary </label>
            <div
              className="field_value"
              dangerouslySetInnerHTML={{
                __html: formValues?.summary || 'N/A',
              }}
            />
          </div>
          <div className="group_field">
            <label>Detail </label>
            <div
              className="field_value"
              dangerouslySetInnerHTML={{
                __html: formValues?.detail || 'N/A',
              }}
            />
          </div>
          <div className="group_field">
            <label>Start Date: </label>
            <div className="field_value">
              {formatDate(formValues?.startAt, 'vi-VN', 'DD/MM/YYYY')}
            </div>
          </div>
          <div className="group_field">
            <label>End Date: </label>
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
                Save Changes
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default FormAddCourse;
