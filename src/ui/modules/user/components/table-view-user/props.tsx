import { ColumnType } from 'antd/lib/table';

import { MAP_ROLES } from '~/constant';
import { StateStatus } from '~/constant/enum';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { generateMappingList, getMappingLabelByValue } from '~/utils';

export const metaFilterUser = () => {
  return {
    fields: [
      {
        key: 'name',
        widgetProps: {
          placeholder: 'Nhập từ khoá cần tìm',
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const columnTableUser = (): ColumnType<any>[] => [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   width: 70,
  // },
  {
    title: 'Họ tên',
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.email.localeCompare(b.email);
    },
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    width: 100,
    ellipsis: true,
    sorter: (a, b) => {
      return a.role.localeCompare(b.role);
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 100,
    render: (value) => {
      return <p>{value === StateStatus.INACTIVE ? 'Active' : 'Inactive'}</p>;
    },
  },
];

export const metaCreateUser = () => {
  return {
    formItemLayout: [6, 20],
    fields: [
      {
        key: 'name',
        label: 'Họ tên:',
        required: true,
        widgetProps: {
          placeholder: 'Input Name',
        },
      },
      {
        key: 'email',
        label: 'Email:',
        required: true,
        widgetProps: {
          placeholder: 'Input Email',
          type: 'email',
        },
      },
    ],
  };
};

export const metaUpdateUser = (record) => {
  return {
    formItemLayout: [6, 20],
    fields: [
      {
        key: 'name',
        label: 'Họ tên:',
        required: true,
        initialValue: record.name,
        widgetProps: {
          placeholder: 'Input Name',
        },
      },
    ],
  };
};
