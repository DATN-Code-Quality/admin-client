import { ColumnType } from 'antd/lib/table';

import { MAP_ROLES, MAP_USER_STATUS } from '~/constant';
import { UserStatus } from '~/constant/enum';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { generateMappingList, getMappingLabelByValue } from '~/utils';

export const metaFilterUser = () => {
  return {
    columns: 3,
    fields: [
      {
        key: 'search',
        colSpan: 3,
        widgetProps: {
          placeholder: 'Search by Name or Email',
          allowClear: true,
          style: {
            minWidth: '250px',
          },
        },
      },
      {
        key: 'role',
        colSpan: 3,
        options: MAP_ROLES,
        widget: 'select',
        widgetProps: {
          maxTagCount: 'responsive',
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Role',
          allowClear: true,
        },
      },
      {
        key: 'status',
        colSpan: 3,
        options: MAP_USER_STATUS,
        widget: 'select',
        widgetProps: {
          maxTagCount: 'responsive',
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Status',
          allowClear: true,
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const columnTableUser = (): ColumnType<any>[] => [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '40%',
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '40%',
    ellipsis: true,
    sorter: (a, b) => {
      return a.email.localeCompare(b.email);
    },
  },
  {
    title: 'Role',
    dataIndex: 'role',
    width: 100,
    responsive: ['lg', 'md'],
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
        label: 'Username',
        required: true,

        widgetProps: {
          placeholder: 'Enter Username',
        },
      },
      {
        key: 'name',
        label: 'Full Name',
        required: true,

        widgetProps: {
          placeholder: 'Enter Full Name',
        },
      },
      {
        key: 'email',
        label: 'Email',
        required: true,

        widgetProps: {
          placeholder: 'Enter Email',
          type: 'email',
        },
      },
      {
        key: 'roles',
        label: 'Roles',
        options: MAP_ROLES,
        widget: 'select',
        required: true,
        widgetProps: {
          placeholder: 'Enter Roles',
          allowClear: true,
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
        label: 'Username',
        required: true,
        initialValue: record.userId,

        formItemProps: {
          style: { display: 'none' },
        },
        widgetProps: {
          placeholder: 'Enter Username',
        },
      },
      {
        key: 'name',
        label: 'Full Name',
        required: true,

        initialValue: record.name,
        widgetProps: {
          placeholder: 'Enter Full Name',
        },
      },
      {
        key: 'email',
        label: 'Email',
        required: true,

        initialValue: record.email,
        widgetProps: {
          placeholder: 'Enter Email',
          type: 'email',
        },
      },
    ],
  };
};

export const metaFilterSyncUser = () => {
  return {
    columns: 3,

    fields: [
      {
        key: 'search',
        colSpan: 3,
        widgetProps: {
          placeholder: 'Search by Name or Email',
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
    title: 'Name',
    dataIndex: 'name',
    width: '40%',
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '40%',
    ellipsis: true,
    sorter: (a, b) => {
      return a.email.localeCompare(b.email);
    },
  },
];
