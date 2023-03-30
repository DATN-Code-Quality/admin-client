import React from 'react';

import { Button, Input, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { MAP_STATE_STATUS } from '~/constant';
import ROUTE from '~/constant/routes';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { getMappingLabelByValue } from '~/utils';

export const metaFilterCourse = () => {
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

export const columnTableAssignment = (): ColumnType<any>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 70,
    render: (value, record, index) => {
      return (
        <Link to={`${ROUTE.COURSE.DETAIL}?id=${record.id}`}>
          <Button type="link">{value}</Button>
        </Link>
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    render: (value, record, index) => {
      return (
        <Link to={`${ROUTE.COURSE.DETAIL}?id=${record.id}`}>
          <Button type="link">{value}</Button>
        </Link>
      );
    },
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return (a, b) => a.dueDate - b.dueDate;
    },
    render: (value, record, index) => {
      return <p>{dayjs(value).format('DD/MM/YYYY')}</p>;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
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
