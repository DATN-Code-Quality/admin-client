import React, { useCallback, useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';

import FormBuilder from './FormBuilder';

import { BREAKPOINTS } from '~/constant';
import useCurrentWidth from '~/hooks/useCurrentWidth';
import logger from '~/utils/logger';

type BaseFilterProps = {
  loading: boolean;
  onFilter: (...args) => void;
  normalizeFn?: (...args) => void;
  meta: any;
  filterOnChange?: boolean;
  showSubmitButton?: boolean;
  style?: any;
};

const BaseFilter: React.FC<BaseFilterProps> = (props) => {
  const {
    loading,
    onFilter,
    normalizeFn,
    meta,
    filterOnChange,
    showSubmitButton = true,
    style = {},
  } = props;
  const [form] = Form.useForm();

  const _filterOnChange = !showSubmitButton || filterOnChange;

  const [formLayout, setFormLayout] = useState<
    'vertical' | 'horizontal' | 'inline'
  >('inline');

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

  const width = useCurrentWidth();

  useEffect(() => {
    if (width <= BREAKPOINTS.MD) {
      setFormLayout('vertical');
    } else {
      setFormLayout('inline');
    }
  }, [width]);

  return (
    <Form
      layout={formLayout}
      style={{ marginBottom: '24px', gap: '12px 0', ...style }}
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
