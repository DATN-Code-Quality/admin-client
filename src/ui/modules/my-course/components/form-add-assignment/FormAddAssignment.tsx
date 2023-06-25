import React, { useCallback, useEffect, useState } from 'react';

import { Button, Form, Input, message, Space } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { TableViewCondition } from '../table-view-condition';

import { metaFormAddAssignment, metaFormAddCondition } from './props';

import { useAssignment } from '~/adapters/appService/assignment.service';
import { MAP_USER_STATUS } from '~/constant';
import { ApiStatus } from '~/constant/enum';
import ROUTE from '~/constant/routes';
import FormBuilder from '~/ui/shared/forms';
import Loading from '~/ui/shared/loading';
import BaseModal from '~/ui/shared/modal';
import { ButtonType } from '~/ui/shared/modal/props';
import {
  findAndReplace,
  generateUrl,
  getMappingLabelByValue,
  removeFromArr,
} from '~/utils';

const configObjectToConditions = (configObject) => {
  if (!configObject) return [];
  return Object.entries(configObject).map(([key, value]) => ({
    key,
    value,
  }));
};

const conditionsToConfigObject = (conditions) => {
  if (!conditions) return {};
  return conditions.reduce((acc, cur) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {});
};

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
  const [conditions, setConditions] = useState<any>([]);
  const [currentCondition, setCurrentCondition] = useState<any>(null);

  const handleSubmitFail = (errMsg) => (err) => {
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
      configObject: conditionsToConfigObject(conditions),
    };
    if (assignmentId) {
      dataSubmit.id = assignmentId;
      updateAssignment(courseId, dataSubmit)
        .then(handleSubmitSuccess('Edit assignment successfully!'))
        .catch(handleSubmitFail('Edit assignment failed!'))
        .finally(() => setLoading(false));
    } else {
      createAssignment(courseId, dataSubmit)
        .then(handleSubmitSuccess('Create assignment successfully!'))
        .catch(handleSubmitFail('Create assignment failed!'))
        .finally(() => setLoading(false));
    }
  };

  const handleEditAssignment = () => {
    setViewMode(false);
  };

  const handleChangeSubmissionType = (e) => {
    setSubmissionType(e.target.value);
  };

  const handleSelectCondition = (value) => {
    setCurrentCondition(value);
  };

  const handleAddCondition = async (values) => {
    const newCondition = {
      ...values,
    };
    setConditions([...conditions, newCondition]);
    return Promise.resolve({ status: ApiStatus.SUCCESS, data: values });
  };

  const handleUpdateCondition = async (values) => {
    const newConditions = findAndReplace(conditions, values, 'key');
    setConditions(newConditions);

    return Promise.resolve({ status: ApiStatus.SUCCESS, data: values });
  };

  const handleRemoveCondition = (value) => {
    const newConditions = removeFromArr(conditions, value, 'key');
    setConditions(newConditions);
    return Promise.resolve({ status: ApiStatus.SUCCESS, data: value });
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
      setConditions(configObjectToConditions(data.configObject));
      form.setFieldsValue(data);
      setFormValues(data);
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
                Save Changes
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
          <div className="form_group mb-4">
            <h5 className="fs-18 mb-4">Assignment Detail</h5>
            <FormBuilder
              form={form}
              meta={metaFormAddAssignment({
                submissionType,
                handleChangeSubmissionType,
              })}
            />
          </div>
          <div className="form_group mb-4">
            <div className="flex justify-between items-center">
              <h5 className="fs-18 mb-4">Config Quality Gates</h5>
              <BaseModal
                onOkFn={handleAddCondition}
                itemTitle=""
                id={0}
                mode={ButtonType.CREATE}
                meta={metaFormAddCondition({
                  conditions,
                  currentCondition,
                  handleSelectCondition,
                })}
                formProps={{ layout: 'vertical' }}
              />
            </div>
            <TableViewCondition
              data={conditions}
              idKey="key"
              handleDeleteItem={handleRemoveCondition}
              handleUpdateItem={handleUpdateCondition}
            />
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
    </>
  );
};

export default FormAddAssignment;
