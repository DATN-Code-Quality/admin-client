import React, { useCallback, useEffect, useState } from 'react';

import { Button, Form, Input, message, Space } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { metaFormAddAssignment } from './props';

import { useAssignment } from '~/adapters/appService/assignment.service';
import { MAP_USER_STATUS } from '~/constant';
import ROUTE from '~/constant/routes';
import FormBuilder from '~/ui/shared/forms';
import Loading from '~/ui/shared/loading';
import { generateUrl, getMappingLabelByValue } from '~/utils';

const FormAddAssignment = ({
  courseId,
  assignmentId,
  initialViewMode = false,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { getDetailAssignment, createAssignment, updateAssignment } =
    useAssignment();
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<boolean>(initialViewMode);
  const [submissionType, setSubmissionType] = useState<any>(null);
  const [formValues, setFormValues] = useState({});

  const handleSubmitFail = (errMsg) => (err) => {
    console.log('err submit', err);
    message.error(errMsg);
    setLoading(false);
    // setViewMode(true);
  };

  const handleSubmitSuccess = (successMsg) => () => {
    message.success(successMsg);
    const url = generateUrl(ROUTE.MY_COURSE.DETAIL, {
      course_id: courseId,
    });
    navigate(url);
    setLoading(false);
    // setViewMode(true);
  };

  const handleSubmit = (values) => {
    // TODO: handle submit
    setLoading(true);
    const dataSubmit = {
      ...values,
      configObject: {},
    };
    if (assignmentId) {
      dataSubmit.id = assignmentId;
      updateAssignment(courseId, dataSubmit)
        .then(handleSubmitSuccess('Cập nhật Bài tập thành công!'))
        .catch(handleSubmitFail('Cập nhật Bài tập thất bại!'))
        .finally(() => setLoading(false));
    } else {
      createAssignment(courseId, dataSubmit)
        .then(handleSubmitSuccess('Tạo mới Bài tập thành công!'))
        .catch(handleSubmitFail('Tạo mới Bài tập thất bại!'))
        .finally(() => setLoading(false));
    }
  };

  const handleEditAssignment = () => {
    setViewMode(false);
  };

  const handleChangeSubmissionType = (e) => {
    console.log(e.target.value);
    setSubmissionType(e.target.value);
  };

  useEffect(() => {
    if (!courseId || !assignmentId) {
      // TODO: handle no data
      return;
    }
    setLoading(true);
    getDetailAssignment({ courseId, assignmentId }).then((res) => {
      const data = res.data.assignment;
      data.dueDate = dayjs(data.dueDate);
      console.log(data);

      form.setFieldsValue(res.data.assignment);
      setFormValues(res.data.assignment);
      setLoading(false);
    });
  }, [courseId, assignmentId]);

  return (
    <>
      {loading && <Loading />}
      {viewMode && (
        <Form form={form} className="form-edit-view view-mode">
          <div className="group_field">
            <label>Assignment Name: </label>
            <div className="field_value">{formValues?.name}</div>
          </div>
          <div className="group_field">
            <label>Description: </label>
            <div className="field_value">{formValues?.description}</div>
          </div>
          <div className="group_field">
            <label>Status: </label>
            <div className="field_value">
              {getMappingLabelByValue(MAP_USER_STATUS, formValues?.status)}
            </div>
          </div>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                size="large"
                onClick={handleEditAssignment}
              >
                Edit thông tin
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
      {!viewMode && (
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="form-edit-view"
        >
          <FormBuilder
            meta={metaFormAddAssignment({
              submissionType,
              handleChangeSubmissionType,
            })}
          />
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

export default FormAddAssignment;
