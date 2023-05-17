import { ColumnType } from 'antd/lib/table';

import { MAP_ROLES, MAP_USER_STATUS } from '~/constant';
import { UserStatus } from '~/constant/enum';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { generateMappingList, getMappingLabelByValue } from '~/utils';

export const metaFilterUser = () => {
  return {
    fields: [
      {
        key: 'search',
        widgetProps: {
          placeholder: 'Tìm kiếm theo Họ tên hoặc Email',
          style: {
            minWidth: '250px',
          },
        },
      },
      {
        key: 'role',
        options: MAP_ROLES,
        widget: 'select',
        widgetProps: {
          maxTagCount: 'responsive',
          style: {
            minWidth: '12rem',
            maxWidth: '12rem',
          },
          placeholder: 'Vai trò',
          allowClear: true,
        },
      },
      {
        key: 'status',
        options: MAP_USER_STATUS,
        widget: 'select',
        widgetProps: {
          maxTagCount: 'responsive',
          style: {
            minWidth: '12rem',
            maxWidth: '12rem',
          },
          placeholder: 'Trạng thái',
          allowClear: true,
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
        label: 'Tên đăng nhập:',
        required: true,
        message: 'Vui lòng không bỏ trống',
        widgetProps: {
          placeholder: 'Nhập username',
        },
      },
      {
        key: 'name',
        label: 'Họ tên:',
        required: true,
        message: 'Vui lòng không bỏ trống',
        widgetProps: {
          placeholder: 'Nhập Họ tên',
        },
      },
      {
        key: 'email',
        label: 'Email:',
        required: true,
        message: 'Vui lòng không bỏ trống',
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
        key: 'userId',
        label: 'Tên đăng nhập:',
        required: true,
        initialValue: record.userId,
        message: 'Vui lòng không bỏ trống',
        formItemProps: {
          style: { display: 'none' },
        },
        widgetProps: {
          placeholder: 'Nhập username',
        },
      },
      {
        key: 'name',
        label: 'Họ tên:',
        required: true,
        message: 'Vui lòng không bỏ trống',
        initialValue: record.name,
        widgetProps: {
          placeholder: 'Nhập Họ tên',
        },
      },
      {
        key: 'email',
        label: 'Email:',
        required: true,
        message: 'Vui lòng không bỏ trống',
        initialValue: record.email,
        widgetProps: {
          placeholder: 'Nhập Email',
          type: 'email',
        },
      },
    ],
  };
};

export const metaFilterSyncUser = () => {
  return {
    fields: [
      {
        key: 'search',
        widgetProps: {
          placeholder: 'Tìm kiếm theo Họ tên hoặc Email',
          style: {
            minWidth: '250px',
          },
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const columnTableSyncUser = (): ColumnType<any>[] => [
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
];
