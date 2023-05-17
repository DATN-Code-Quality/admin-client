import { ColumnType } from 'antd/lib/table';

import { MAP_ROLES, MAP_USER_STATUS } from '~/constant';
import { UserStatus } from '~/constant/enum';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { generateMappingList, getMappingLabelByValue } from '~/utils';

export const metaFilterUser = () => {
  return {
    fields: [
      {
        key: 'name',
        widgetProps: {
          placeholder: 'Tìm kiếm theo họ tên hoặc email',
          style: {
            minWidth: '250px',
          },
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const columnTableUser = (): ColumnType<any>[] => [
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
    render: (value) => {
      return <p>{getMappingLabelByValue(MAP_ROLES, value)}</p>;
    },
  },
];

export const metaCreateUser = () => {
  return {
    formItemLayout: [24, 24],
    fields: [
      {
        key: 'userId',
        label: 'Username:',
        required: true,
        widgetProps: {
          placeholder: 'Nhập username',
        },
      },
      {
        key: 'name',
        label: 'Họ tên:',
        required: true,
        widgetProps: {
          placeholder: 'Nhập Họ tên',
        },
      },
      {
        key: 'email',
        label: 'Email:',
        required: true,
        widgetProps: {
          placeholder: 'Nhập Email',
          type: 'email',
        },
      },
    ],
  };
};

export const metaUpdateUser = (record) => {
  return {
    formItemLayout: [24, 24],
    fields: [
      {
        key: 'name',
        label: 'Họ tên:',
        required: true,
        initialValue: record.name,
        widgetProps: {
          placeholder: 'Nhập Họ tên',
        },
      },
      {
        key: 'email',
        label: 'Email:',
        required: true,
        initialValue: record.email,
        widgetProps: {
          placeholder: 'Nhập Email',
          type: 'email',
        },
      },
    ],
  };
};
