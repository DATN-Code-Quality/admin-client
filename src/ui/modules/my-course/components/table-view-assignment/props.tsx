import { ColumnType } from 'antd/lib/table';

import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { formatDate } from '~/utils';

export const metaFilterAssignment = () => {
  return {
    fields: [
      {
        key: 'search',
        widgetProps: {
          placeholder: 'Enter keyword',
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const columnTableAssignment = (setAssignment): ColumnType<any>[] => [
  {
    title: 'Assignment Title',
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    render: (value, record, index) => {
      return (
        <p style={{ cursor: 'pointer' }} onClick={() => setAssignment(record)}>
          {value}
        </p>
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
      return <p>{formatDate(value) || 'N/A'}</p>;
    },
  },
];

export const metaFilterSyncAssignment = () => {
  return {
    fields: [
      {
        key: 'search',
        widgetProps: {
          placeholder: 'Enter keyword',
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const columnTableSyncAssignment = (): ColumnType<any>[] => [
  {
    title: 'Assignment Title',
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
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
      return <p>{formatDate(value) || 'N/A'}</p>;
    },
  },
];
