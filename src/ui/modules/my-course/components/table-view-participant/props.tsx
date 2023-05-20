import { ColumnType } from 'antd/lib/table';

import { MAP_SUB_ROLES, MAP_USER_STATUS } from '~/constant';
import { UserStatus } from '~/constant/enum';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { generateMappingList, getMappingLabelByValue } from '~/utils';

export const metaFilterParticipant = () => {
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
        options: MAP_SUB_ROLES,
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

export const columnTableParticipant = (): ColumnType<any>[] => [
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
      return <p>{getMappingLabelByValue(MAP_SUB_ROLES, value)}</p>;
    },
  },
];

export const metaCreateParticipant = () => {
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

export const metaUpdateParticipant = (record) => {
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
      {
        key: 'email',
        label: 'Email:',
        required: true,
        initialValue: record.email,
        widgetProps: {
          placeholder: 'Input Email',
          type: 'email',
        },
      },
    ],
  };
};

export const metaFilterSyncParticipant = () => {
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
        options: MAP_SUB_ROLES,
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

export const columnTableSyncParticipant = (): ColumnType<any>[] => [
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
      return <p>{getMappingLabelByValue(MAP_SUB_ROLES, value)}</p>;
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 100,
    render: (value) => {
      return <p>{getMappingLabelByValue(MAP_USER_STATUS, value)}</p>;
    },
  },
];
