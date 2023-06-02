import React, { useCallback } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';

import FormBuilder from './FormBuilder';

import logger from '~/utils/logger';

type BaseFilterProps = {
  loading: boolean;
  onFilter: (...args) => void;
  normalizeFn?: (...args) => void;
  meta: any;
  filterOnChange?: boolean;
  showSubmitButton?: boolean;
};

const BaseFilter: React.FC<BaseFilterProps> = (props) => {
  const {
    loading,
    onFilter,
    normalizeFn,
    meta,
    filterOnChange,
    showSubmitButton = true,
  } = props;
  const [form] = Form.useForm();

  const _filterOnChange = !showSubmitButton || filterOnChange;

  const handleChange = useCallback((values) => {
    const submitFilter = normalizeFn ? normalizeFn(values) : values;
    logger.info('submitFilter', values);
    logger.info('submitFilter', submitFilter);
    onFilter(submitFilter);
  }, []);

  const handleFieldsChange = () => {
    const values = form.getFieldsValue();
    const submitFilter = normalizeFn ? normalizeFn(values) : values;
    logger.info('submitFilter', values);
    logger.info('submitFilter', submitFilter);
    onFilter(submitFilter);
  };

  return (
    <Form
      layout="inline"
      style={{ marginBottom: '24px', gap: '12px 0' }}
      initialValues={meta.initialValues}
      form={form}
      onFinish={handleChange}
      onFieldsChange={_filterOnChange ? handleFieldsChange : undefined}
    >
      <FormBuilder meta={meta} form={form} />
      {showSubmitButton && (
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            icon={<SearchOutlined />}
            loading={loading}
          >
            Search
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default BaseFilter;
