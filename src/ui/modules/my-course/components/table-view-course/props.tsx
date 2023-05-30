import { Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { MAP_SUB_ROLES } from '~/constant';
import ROUTE from '~/constant/routes';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { formatDate, generateUrl } from '~/utils';

export const metaFilterCourse = () => {
  return {
    fields: [
      {
        key: 'search',
        widgetProps: {
          placeholder: 'Enter keyword',
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
          placeholder: 'My Role',
          allowClear: true,
        },
      },
      {
        key: 'startAt',
        widget: 'date-picker',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'Start Date',
        },
      },
      {
        key: 'endAt',
        widget: 'date-picker',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
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
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    render: (value, record, index) => {
      const url = generateUrl(ROUTE.MY_COURSE.DETAIL, { course_id: record.id });
      return (
        <Link to={url}>
          <Button type="link">{value}</Button>
        </Link>
      );
    },
  },
  {
    title: 'Start Date',
    dataIndex: 'startAt',
    width: 240,
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
    width: 240,
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
    fields: [
      {
        key: 'search',
        widgetProps: {
          placeholder: 'Enter keyword',
        },
      },
      {
        key: 'startAt',
        widget: 'date-picker',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'Start Date',
        },
      },
      {
        key: 'endAt',
        widget: 'date-picker',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
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
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    title: 'Start Date',
    dataIndex: 'startAt',
    width: 240,
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
    width: 240,
    sorter: (a, b) => {
      return new Date(a.endAt).getTime() - new Date(b.endAt).getTime();
    },
    render: (value) => {
      return <p>{formatDate(value) || 'N/A'}</p>;
    },
  },
];
