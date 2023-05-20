import { ColumnType } from 'antd/lib/table';

import { MAP_CONFIG_OBJECT } from '~/constant';
import { getMappingLabelByValue } from '~/utils';

export const columnTableCondition = (): ColumnType<any>[] => [
  {
    title: 'Tên điều kiện',
    dataIndex: 'key',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    render: (value, record, index) => {
      return <p>{getMappingLabelByValue(MAP_CONFIG_OBJECT, value)}</p>;
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
      },
    ],
  };

  return meta;
};
