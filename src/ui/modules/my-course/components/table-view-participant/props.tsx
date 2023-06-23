import { ColumnType } from 'antd/lib/table';

import { MAP_SUB_ROLES, MAP_USER_STATUS } from '~/constant';
import { UserStatus } from '~/constant/enum';
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
    ellipsis: true,
    sorter: (a, b) => {
      return a.email.localeCompare(b.email);
    },
  },
  {
    title: 'Role',
    dataIndex: 'role',
    width: '20%',
    ellipsis: true,
    sorter: (a, b) => {
      return a.role.localeCompare(b.role);
    },
    render: (value) => {
      return <p>{getMappingLabelByValue(MAP_SUB_ROLES, value)}</p>;
    },
  },
];
