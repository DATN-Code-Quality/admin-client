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
  {
    title: 'ID',
    dataIndex: 'id',
    width: 70,
  },
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
    title: 'Roles',
    dataIndex: 'roles',
    width: 100,
    ellipsis: true,
    sorter: (a, b) => {
      const aRole = getMappingLabelByValue(MAP_ROLES, a.roles[0]);
      const bRole = getMappingLabelByValue(MAP_ROLES, b.roles[0]);
      return aRole.localeCompare(bRole);
    },
    render: (value) => {
      return <p>{getMappingLabelByValue(MAP_ROLES, value[0])}</p>;
    },
  },
  {
    title: 'Partner',
    dataIndex: 'partner_id',
    width: 140,
    ellipsis: true,
    filters: partners.map((partner) => ({
      text: partner.name,
      value: partner.id,
    })),
    onFilter: (value: number, record) => record.partner_id === value,
    render: (value) => {
      const partner = partners.find((partner) => partner.id === value);
      return <p>{partner?.name || ''}</p>;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    render: (value) => {
      return <p>{value === StateStatus.ACTIVE ? 'Active' : 'Inactive'}</p>;
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
        message: 'Please input',
        widgetProps: {
          placeholder: 'Input Name',
        },
      },
      {
        key: 'phone_number',
        label: 'Phone Number:',
        required: true,
        message: 'Please input',
        widgetProps: {
          placeholder: 'Input Phone Number',
        },
      },
      {
        key: 'partner_id',
        label: 'Partner:',
        options: mappingPartnerList,
        widget: 'select',
        required: true,
        message: 'Please input',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Input Partner',
          allowClear: true,
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
        initialValue: record.name,
        required: true,
        message: 'Please input',
        widgetProps: {
          placeholder: 'Input Name',
        },
      },
      {
        key: 'phone_number',
        label: 'Phone Number:',
        initialValue: record.phone_number,
        required: true,
        disabled: true,
        message: 'Please input',
        widgetProps: {
          placeholder: 'Input Phone Number',
        },
      },
      {
        key: 'partner_id',
        label: 'Partner:',
        initialValue: record.partner_id,
        options: mappingPartnerList,
        widget: 'select',
        required: true,
        message: 'Please input',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Input Partner',
          allowClear: true,
        },
      },
    ],
  };
};
