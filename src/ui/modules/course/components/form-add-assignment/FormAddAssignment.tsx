import React, { useCallback, useEffect, useState } from 'react';

import { Button, Form, Input, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import { metaFormAddAssignment } from './props';

import { useAssignment } from '~/adapters/appService/assignment.service';
import { MAP_STATE_STATUS } from '~/constant';
import ROUTE from '~/constant/routes';
import FormBuilder from '~/ui/shared/forms';
import Loading from '~/ui/shared/loading';
import { getMappingLabelByValue } from '~/utils';
import dayjs from 'dayjs';

const FormAddAssignment = ({ courseId, id, initialViewMode = false }) => {
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
      navigate(`${ROUTE.COURSE.DETAIL}?id=${courseId}`);
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
      updateAssignment(dataSubmit)
        .then(handleSubmitSuccess('Cập nhật Ngành nghề thành công!'))
        .catch(handleSubmitFail('Cập nhật Ngành nghề thất bại!'))
        .finally(() => setLoading(false));
    } else {
      createAssignment(dataSubmit)
        .then(handleSubmitSuccess('Cập nhật Ngành nghề thành công!'))
        .catch(handleSubmitFail('Cập nhật Ngành nghề thất bại!'))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleEditAssignment = () => {
    setViewMode(false);
  };

  const handleChangeSubmissionType = (e) => {
    console.log(e.target.value);
    setSubmissionType(e.target.value);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      getDetailAssignment(id).then((res) => {
        res.data.dueDate = dayjs(res.data.dueDate);
        form.setFieldsValue(res.data);
        setFormValues(res.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

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
              {getMappingLabelByValue(MAP_STATE_STATUS, formValues?.status)}
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
