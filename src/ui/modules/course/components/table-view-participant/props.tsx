import { ColumnType } from 'antd/lib/table';

import { MAP_ROLES, MAP_SUB_ROLES, MAP_USER_STATUS } from '~/constant';
import { SubRole } from '~/constant/enum';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { generateMappingList, getMappingLabelByValue } from '~/utils';

export const metaFilterParticipant = () => {
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
      {
        key: 'role',
        colSpan: 3,
        options: MAP_SUB_ROLES,
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

export const columnTableParticipant = (): ColumnType<any>[] => [
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
    responsive: ['sm'],
    ellipsis: true,
    sorter: (a, b) => {
      return a.email.localeCompare(b.email);
    },
  },
  {
    title: 'Role',
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
    formItemLayout: [24, 24],
    fields: [
      {
        key: 'name',
        label: 'Name',
        required: true,
        widgetProps: {
          placeholder: 'Input Name',
        },
      },
      {
        key: 'email',
        label: 'Email',
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
    formItemLayout: [24, 24],
    fields: [
      {
        key: 'name',
        label: 'Name',
        required: true,
        disabled: true,
        initialValue: record.name,
        widgetProps: {
          placeholder: 'Input Name',
        },
      },
      {
        key: 'role',
        label: 'Role',
        required: true,
        options: MAP_SUB_ROLES,
        widget: 'select',
        initialValue: record.role,
        widgetProps: {
          maxTagCount: 'responsive',
          style: {
            width: '100%',
          },
          placeholder: 'Role',
        },
      },
    ],
  };
};

export const metaFilterSyncParticipant = () => {
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
      {
        key: 'role',
        colSpan: 3,
        options: MAP_SUB_ROLES,
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

export const columnTableSyncParticipant = (): ColumnType<any>[] => [
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
    responsive: ['sm'],
    sorter: (a, b) => {
      return a.email.localeCompare(b.email);
    },
  },
  {
    title: 'Role',
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
    title: 'Status',
    dataIndex: 'status',
    responsive: ['sm'],
    width: 100,
    render: (value) => {
      return <p>{getMappingLabelByValue(MAP_USER_STATUS, value)}</p>;
    },
  },
];

export const metaFilterAddParticipant = () => {
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
      // {
      //   key: 'role',
      //   options: MAP_ROLES,
      //   widget: 'select',
      //   widgetProps: {
      //     maxTagCount: 'responsive',
      //     style: {
      //       minWidth: '12rem',
      //       maxWidth: '12rem',
      //     },
      //     placeholder: 'Role',
      //     allowClear: true,
      //   },
      // },
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

export const columnTableAddParticipant = (): ColumnType<any>[] => [
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
    responsive: ['sm'],
    ellipsis: true,
    sorter: (a, b) => {
      return a.email.localeCompare(b.email);
    },
  },
];
