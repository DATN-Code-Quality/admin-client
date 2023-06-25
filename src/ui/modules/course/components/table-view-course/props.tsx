import { Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import ROUTE from '~/constant/routes';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { formatDate } from '~/utils';

export const metaFilterCourse = () => {
  return {
    columns: 3,
    fields: [
      {
        key: 'search',
        colSpan: 3,
        widgetProps: {
          placeholder: 'Enter keyword',
        },
      },
      {
        key: 'startAt',
        colSpan: 3,
        widget: 'date-picker',
        widgetProps: {
          autoSize: { minRows: 3 },
          style: {
            width: '100%',
          },
          showCount: true,
          placeholder: 'Start Date',
        },
      },
      {
        key: 'endAt',
        colSpan: 3,
        widget: 'date-picker',
        widgetProps: {
          autoSize: { minRows: 3 },
          style: {
            width: '100%',
          },
          showCount: true,
          placeholder: 'End Date',
        },
      },
      // {
      //   key: 'range_time',
      //   widget: 'range-picker',
      //   widgetProps: {
      //     picker: 'date',
      //     style: {
      //       minWidth: '16rem',
      //       maxWidth: '16rem',
      //     },
      //     autoSize: { maxRows: 20, minRows: 3 },
      //     showCount: true,
      //     maxLength: 300,
      //   },
      // },
    ],
  } as IMetaFormBuilder;
};

export const columnTableCourse = (): ColumnType<any>[] => [
  {
    title: 'Course Name',
    dataIndex: 'name',
    width: '50%',
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
    title: 'Start Date',
    dataIndex: 'startAt',
    width: '25%',
    sorter: (a, b) => {
      return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
    },
    render: (value) => {
      return <p>{formatDate(value) || 'N/A'}</p>;
    },
  },
  {
    title: 'End Date',
    dataIndex: 'endAt',
    width: '25%',
    sorter: (a, b) => {
      return new Date(a.endAt).getTime() - new Date(b.endAt).getTime();
    },
    render: (value) => {
      return <p>{formatDate(value) || 'N/A'}</p>;
    },
  },
];

export const metaFilterSyncCourse = () => {
  return {
    columns: 3,
    fields: [
      {
        key: 'search',
        colSpan: 3,
        widgetProps: {
          placeholder: 'Enter keyword',
        },
      },
      {
        key: 'startAt',
        colSpan: 3,
        widget: 'date-picker',
        widgetProps: {
          autoSize: { minRows: 3 },
          style: {
            width: '100%',
          },
          showCount: true,
          placeholder: 'Start Date',
        },
      },
      {
        key: 'endAt',
        colSpan: 3,
        widget: 'date-picker',
        widgetProps: {
          autoSize: { minRows: 3 },
          style: {
            width: '100%',
          },
          showCount: true,
          placeholder: 'End Date',
        },
      },
      // {
      //   key: 'range_time',
      //   widget: 'range-picker',
      //   widgetProps: {
      //     picker: 'date',
      //     style: {
      //       minWidth: '16rem',
      //       maxWidth: '16rem',
      //     },
      //     autoSize: { maxRows: 20, minRows: 3 },
      //     showCount: true,
      //     maxLength: 300,
      //   },
      // },
    ],
  } as IMetaFormBuilder;
};

export const columnTableSyncCourse = (): ColumnType<any>[] => [
  {
    title: 'Course Name',
    dataIndex: 'name',
    width: '50%',
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    title: 'Start Date',
    dataIndex: 'startAt',
    width: '25%',
    sorter: (a, b) => {
      return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
    },
    render: (value) => {
      return <p>{formatDate(value) || 'N/A'}</p>;
    },
  },
  {
    title: 'End Date',
    dataIndex: 'endAt',
    width: '25%',
    sorter: (a, b) => {
      return new Date(a.endAt).getTime() - new Date(b.endAt).getTime();
    },
    render: (value) => {
      return <p>{formatDate(value) || 'N/A'}</p>;
    },
  },
];
