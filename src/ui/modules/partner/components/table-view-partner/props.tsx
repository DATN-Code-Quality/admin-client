import React from 'react';

import { Button, Input, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';

import { MAP_PARTNER_TYPE, MAP_STATE_STATUS } from '~/constant';
import { PartnerType, StateStatus } from '~/constant/enum';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { generateMappingList, getMappingLabelByValue } from '~/utils';

export const metaFilterPartner = () => {
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

export const columnTablePartner = ({
  agencies,
  handleViewThresholds,
}): ColumnType<any>[] => [
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
    title: 'Type',
    dataIndex: 'type',
    width: 100,
    sorter: (a, b) => {
      const aType = getMappingLabelByValue(MAP_PARTNER_TYPE, a.type);
      const bType = getMappingLabelByValue(MAP_PARTNER_TYPE, b.type);
      return aType.localeCompare(bType);
    },
    render: (value) => {
      return <p>{getMappingLabelByValue(MAP_PARTNER_TYPE, value)}</p>;
    },
  },
  {
    title: 'Agency',
    dataIndex: 'under_agency_id',
    width: 140,
    ellipsis: true,
    render: (value) => {
      const agency = agencies.find((a) => a.id === value);
      return <p>{agency?.name || ''}</p>;
    },
  },
  {
    title: 'Thresholds',
    dataIndex: 'thresholds',
    width: 140,
    ellipsis: true,
    render: (value) => {
      return (
        <Button type="link" onClick={() => handleViewThresholds(value)}>
          Detail
        </Button>
      );
    },
  },
  {
    title: 'State',
    dataIndex: 'state',
    width: 100,
    render: (value) => {
      return <p>{getMappingLabelByValue(MAP_STATE_STATUS, value)}</p>;
    },
  },
];

const MultipleInput = ({ value, onChange }) => {
  const [list, setList] = React.useState<string[]>(value || []);
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddValue = () => {
    if (!inputValue) {
      return;
    }
    // check for duplicate value
    if (list.includes(inputValue)) {
      setInputValue('');
      return;
    }

    const updatedList = [...list];
    updatedList.push(inputValue);
    setList(updatedList);
    onChange(updatedList);
    setInputValue('');
  };

  const handleRemoveValue = (index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
    onChange(updatedList);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          style={{ marginRight: '8px' }}
        />
        <Button onClick={handleAddValue}>Add</Button>
      </div>
      <div style={{ marginTop: '8px' }}>
        {list?.map((v, idx) => {
          return (
            <Tag
              style={{ marginBottom: '4px' }}
              color="purple"
              closable
              onClose={() => handleRemoveValue(idx)}
              key={v}
            >
              {v}
            </Tag>
          );
        })}
      </div>
    </>
  );
};

export const metaCreatePartner = ({ type, agencies, handleSelectType }) => {
  const meta: any = {
    formItemLayout: [6, 20],
    fields: [
      {
        key: 'name',
        label: 'Partner Name:',
        required: true,
        message: 'Please input',
        widgetProps: {
          placeholder: 'Input Partner Name',
        },
      },
      {
        key: 'type',
        label: 'Type:',
        options: MAP_PARTNER_TYPE,
        widget: 'select',
        required: true,
        message: 'Please input',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Input Partner Type',
          allowClear: true,
        },
        onChange: (selectedType) => handleSelectType(selectedType),
      },
    ],
  };
  if (type === PartnerType.PARTNER) {
    const mappingAgencyList = generateMappingList(agencies, 'id', 'name');
    meta.fields.push(
      {
        key: 'under_agency_id',
        label: 'Under Agency:',
        options: mappingAgencyList,
        widget: 'select',
        required: true,
        message: 'Please input',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Input Under Agency',
          allowClear: true,
        },
      },
      {
        key: 'agency_view_log',
        label: 'View Log:',
        options: [
          [true, 'Yes'],
          [false, 'No'],
        ],
        widget: 'select',
        required: true,
        message: 'Please input',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Input Agency View Log',
          allowClear: true,
        },
      },
      {
        key: 'mapping_parter_id',
        label: 'Partner ID:',
        required: true,
        widget: MultipleInput,
        message: 'Please input',
        widgetProps: {
          placeholder: 'Input Partner ID',
        },
      }
    );
  }
  return meta;
};

export const metaUpdatePartner = (
  record,
  { type, agencies, handleSelectType }
) => {
  const meta: any = {
    formItemLayout: [6, 20],
    fields: [
      {
        key: 'name',
        label: 'Partner Name:',
        required: true,
        initialValue: record.name,
        message: 'Please input',
        widgetProps: {
          placeholder: 'Input Partner Name',
        },
      },
      {
        key: 'type',
        label: 'Type:',
        options: MAP_PARTNER_TYPE,
        widget: 'select',
        required: true,
        initialValue: record.type,
        message: 'Please input',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Input Partner Type',
          allowClear: true,
        },
        onChange: (selectedType) => handleSelectType(selectedType),
      },
    ],
  };
  if (type === PartnerType.PARTNER) {
    const mappingAgencyList = generateMappingList(agencies, 'id', 'name');
    meta.fields.push(
      {
        key: 'under_agency_id',
        label: 'Under Agency:',
        options: mappingAgencyList,
        widget: 'select',
        required: true,
        initialValue: record.under_agency_id,
        message: 'Please input',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Input Under Agency',
          allowClear: true,
        },
      },
      {
        key: 'agency_view_log',
        label: 'View Log:',
        options: [
          [true, 'Yes'],
          [false, 'No'],
        ],
        widget: 'select',
        required: true,
        initialValue: record.agency_view_log,
        message: 'Please input',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Input Agency View Log',
          allowClear: true,
        },
      },
      {
        key: 'mapping_parter_id',
        label: 'Partner ID:',
        required: true,
        widget: MultipleInput,
        initialValue: [1231, 1242, 1233, 4221],
        message: 'Please input',
        widgetProps: {
          placeholder: 'Input Partner ID',
        },
      }
    );
  }
  return meta;
};
