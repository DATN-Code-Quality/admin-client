import { ColumnType } from 'antd/lib/table';

import {
  CONDITION_OPERATOR,
  MAP_CONDITION_OPERATOR,
  MAP_CONFIG_OBJECT,
} from '~/constant';
import { getMappingLabelByValue } from '~/utils';
import Is from '~/utils/is';

export const columnTableCondition = (): ColumnType<any>[] => [
  {
    title: 'Tên điều kiện',
    dataIndex: 'key',
    width: 200,
    ellipsis: true,
    render: (value, record, index) => {
      return <p>{getMappingLabelByValue(MAP_CONFIG_OBJECT, value)}</p>;
    },
  },
  {
    title: 'Operator',
    width: 200,
    ellipsis: true,
    render: (value, record, index) => {
      const operator: any = CONDITION_OPERATOR[record.key];
      return <p>{getMappingLabelByValue(MAP_CONDITION_OPERATOR, operator)}</p>;
    },
  },
  {
    title: 'Giá trị',
    dataIndex: 'value',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.value - b.value;
    },
  },
];

export const metaFormUpdateCondition = (record) => {
  const meta: any = {
    columns: 6,
    formItemLayout: null,
    colon: true,
    fields: [
      {
        colSpan: 6,
        key: 'key',
        options: MAP_CONFIG_OBJECT,
        widget: 'select',
        initialValue: record.key,
        label: 'Điều kiện quét code:',
        formItemProps: {
          style: { display: 'none' },
        },
        required: true,
        widgetProps: {
          maxTagCount: 'responsive',
          placeholder: 'Chọn tiêu chí',
        },
      },
      {
        colSpan: 6,
        key: 'value',
        initialValue: record.value,
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
