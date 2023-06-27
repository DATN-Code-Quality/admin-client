import React from 'react';

import { ColumnType } from 'antd/lib/table';
import { Link } from 'react-router-dom';

import ROUTE from '~/constant/routes';
import { Assignment } from '~/domain/assignment';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { formatDate, generateUrl } from '~/utils';

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

export const columnTableAssignment = (): ColumnType<any>[] => [
  {
    title: 'Assignment Title',
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    render: (value, record, index) => {
      const assignment = record as Assignment;
      const assignmentUrl = generateUrl(ROUTE.MY_COURSE.ASSIGN, {
        id: assignment.id,
        course_id: assignment.courseId,
      });
      return <Link to={assignmentUrl}>{value}</Link>;
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
