import React from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Checkbox, Input, Upload } from 'antd';
import Button from 'antd-button-color';
import dayjs from 'dayjs';

import { MAP_CONFIG_OBJECT, MAP_USER_STATUS } from '~/constant';
import Editor from '~/ui/shared/editor';
import UploadButton from '~/ui/shared/upload';
import { enableAllowedOptions } from '~/utils';
import Is from '~/utils/is';

const UploadFile = () => {
  return (
    <Upload>
      <Button icon={<UploadOutlined />}> Click to Upload</Button>
    </Upload>
  );
};

export const metaFormAddAssignment = ({
  submissionType,
  handleChangeSubmissionType,
}) => {
  const meta: any = {
    columns: 6,
    formItemLayout: null,
    colon: true,
    fields: [
      {
        colSpan: 6,
        key: 'name',
        label: 'Tên bài tập:',
        required: true,
      },
      {
        colSpan: 6,
        key: 'description',
        label: 'Mô tả:',
        required: true,
        widget: Editor,
      },
      {
        colSpan: 6,
        key: 'dueDate',
        label: 'Thời gian hết hạn:',
        widget: 'date-picker',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          showTime: true,
          showToday: true,
          maxLength: 300,
          placeholder: 'Chọn thời gian hết hạn',
          disabledDate: (current) => {
            return current && current.valueOf() < Date.now();
          },
          disabledTime: (current) => {
            return current && current.valueOf() < Date.now();
          },
        },
      },
      // {
      //   colSpan: 2,
      //   key: 'cutoffDate',
      //   label: 'Cut-off Date:',
      //   widget: 'date-picker',
      //   widgetProps: {
      //     autoSize: { maxRows: 20, minRows: 3 },
      //     showCount: true,
      //     showTime: true,
      //     showToday: true,
      //     maxLength: 300,
      //     placeholder: 'Choose Date',
      //   },
      // },
      // {
      //   colSpan: 6,
      //   key: 'submissionType',
      //   name: 'submissionType',
      //   label: 'Submission Type:',
      //   required: true,
      //   widget: 'radio-group',
      //   options: [
      //     ['File', 'File'],
      //     ['Github', 'Github'],
      //     ['Google Drive', 'Google Drive'],
      //   ],
      //   onChange: handleChangeSubmissionType,
      // },
    ],
  };

  // if (['Github', 'Google Drive'].includes(submissionType)) {
  //   meta.fields.push({
  //     colSpan: 6,
  //     key: 'submissionLink',
  //     label: 'Submission Link:',
  //     required: true,
  //     placeholder: `Link ${submissionType}}`,
  //   });
  // }

  // if (['File'].includes(submissionType)) {
  //   meta.fields.push({
  //     colSpan: 6,
  //     key: 'submissionFile',
  //     label: 'Submission File:',
  //     required: true,
  //     widget: UploadFile,
  //   });
  // }

  // meta.fields.push({
  //   colSpan: 2,
  //   key: 'status',
  //   label: 'Status:',
  //   options: MAP_USER_STATUS,
  //   widget: 'select',
  //   required: true,
  //   widgetProps: {
  //     style: {
  //       minWidth: '12rem',
  //     },
  //     allowClear: true,
  //   },
  // });

  return meta;
};

export const metaFormAddCondition = ({ conditions }) => {
  const selectedValues = conditions.map((item) => item.key);
  const allValues = MAP_CONFIG_OBJECT.map((item) => item.value);
  const allowedValues = allValues.filter(
    (item) => !selectedValues.includes(item)
  );
  const allowedConditions = enableAllowedOptions(
    MAP_CONFIG_OBJECT,
    allowedValues
  );
  const meta: any = {
    columns: 6,
    formItemLayout: null,
    colon: true,
    fields: [
      {
        colSpan: 6,
        key: 'key',
        options: allowedConditions,
        widget: 'select',
        label: 'Điều kiện quét code:',
        required: true,
        widgetProps: {
          maxTagCount: 'responsive',
          placeholder: 'Chọn tiêu chí',
        },
      },
      {
        colSpan: 6,
        key: 'value',
        label: 'Giá trị:',
        required: true,
        widgetProps: {
          placeholder: `Nhập giá trị điều kiện`,
        },
        rules: [
          {
            validator: (rule, value, callback) => {
              return new Promise((resolve, reject) => {
                const numberValue = parseInt(value, 10);
                if (
                  Is.number(numberValue) &&
                  numberValue >= 0 &&
                  numberValue <= 100
                ) {
                  resolve();
                } else {
                  reject(
                    new Error('Giá trị phải là số và nằm trong khoảng 0-100')
                  );
                }
              });
            },
          },
        ],
      },
    ],
  };
  return meta;
};
