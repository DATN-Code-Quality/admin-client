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

export const columnTableUser = ({ partners }): ColumnType<any>[] => [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   width: 70,
  // },
  {
    title: 'Name',
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
    title: 'Roles',
    dataIndex: 'roles',
    width: 100,
    ellipsis: true,
    sorter: (a, b) => {
      return a.roles[0].localeCompare(b.roles[0]);
    },
    render: (value) => {
      return <p>{value[0]}</p>;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    render: (value) => {
      return <p>{value === StateStatus.INACTIVE ? 'Active' : 'Inactive'}</p>;
    },
  },
];

export const metaCreateUser = ({ partners }) => {
  const mappingPartnerList = generateMappingList(partners, 'id', 'name');
  return {
    formItemLayout: [6, 20],
    fields: [
      {
        key: 'name',
        label: 'Name:',
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
      {
        key: 'phone_number',
        label: 'Phone Number:',
        required: true,
        widgetProps: {
          placeholder: 'Input Phone Number',
          inputMode: 'numeric',
        },
      },
    ],
  };
};

export const metaUpdateUser = (record, { partners }) => {
  const mappingPartnerList = generateMappingList(partners, 'id', 'name');
  return {
    formItemLayout: [6, 20],
    fields: [
      {
        key: 'name',
        label: 'Name:',
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
      {
        key: 'phone_number',
        label: 'Phone Number:',
        required: true,
        initialValue: record.phone_number,
        widgetProps: {
          placeholder: 'Input Phone Number',
          inputMode: 'numeric',
        },
      },
    ],
  };
};
