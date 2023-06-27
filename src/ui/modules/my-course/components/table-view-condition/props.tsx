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
    title: 'Condition',
    dataIndex: 'key',
    width: '33%',
    ellipsis: true,
    sorter: (a, b) => {
      return a.key.localeCompare(b.key);
    },
    render: (value, record, index) => {
      return <p>{getMappingLabelByValue(MAP_CONFIG_OBJECT, value)}</p>;
    },
  },
  {
    title: 'Operator',
    width: '33%',
    ellipsis: true,
    sorter: (a, b) => {
      const operatorA: any = CONDITION_OPERATOR[a.key];
      const operatorB: any = CONDITION_OPERATOR[b.key];
      return operatorA.localeCompare(operatorB);
    },
    render: (value, record, index) => {
      const operator: any = CONDITION_OPERATOR[record.key];
      return <p>{getMappingLabelByValue(MAP_CONDITION_OPERATOR, operator)}</p>;
    },
  },
  {
    title: 'Value',
    dataIndex: 'value',
    width: '33%',
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
        label: 'Condition',
        formItemProps: {
          style: { display: 'none' },
        },
        required: true,
        widgetProps: {
          maxTagCount: 'responsive',
        },
      },
      {
        colSpan: 6,
        key: 'value',
        initialValue: record.value,
        label: 'Value',
        widgetProps: {
          placeholder: `Enter value`,
        },
        rules: [
          {
            validator: (rule, value, callback) => {
              const maxValue =
                record.key === 'coverage' ? 100 : Number.MAX_SAFE_INTEGER;
              return new Promise((resolve, reject) => {
                const numberValue = parseInt(value, 10);
                if (!value) {
                  reject(new Error(`Please Enter Value`));
                } else if (!Is.number(numberValue)) {
                  reject(new Error(`Value must be a number`));
                } else if (numberValue < 0 || numberValue > maxValue) {
                  reject(new Error(`Value must be between 0 and ${maxValue}`));
                } else {
                  resolve();
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
