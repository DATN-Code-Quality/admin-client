import { Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import ROUTE from '~/constant/routes';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { formatDate } from '~/utils';

export const metaFilterCourse = () => {
  return {
    fields: [
      {
        key: 'search',
        widgetProps: {
          placeholder: 'Nhập từ khoá cần tìm',
        },
      },
      {
        key: 'startAt',
        widget: 'date-picker',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'Thời gian bắt đầu',
        },
      },
      {
        key: 'endAt',
        widget: 'date-picker',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'Thời gian kết thúc',
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
    title: 'Tên khoá học',
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
    title: 'Thời gian bắt đầu',
    dataIndex: 'startAt',
    width: 240,
    sorter: (a, b) => {
      return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
    },
    render: (value) => {
      return <p>{formatDate(value) || 'Chưa cập nhật'}</p>;
    },
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'endAt',
    width: 240,
    sorter: (a, b) => {
      return new Date(a.endAt).getTime() - new Date(b.endAt).getTime();
    },
    render: (value) => {
      return <p>{formatDate(value) || 'Chưa cập nhật'}</p>;
    },
  },
];

export const metaFilterSyncCourse = () => {
  return {
    fields: [
      {
        key: 'search',
        widgetProps: {
          placeholder: 'Nhập từ khoá cần tìm',
        },
      },
      {
        key: 'startAt',
        widget: 'date-picker',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'Thời gian bắt đầu',
        },
      },
      {
        key: 'endAt',
        widget: 'date-picker',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'Thời gian kết thúc',
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
    title: 'Tên khoá học',
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'startAt',
    width: 240,
    sorter: (a, b) => {
      return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
    },
    render: (value) => {
      return <p>{formatDate(value) || 'Chưa cập nhật'}</p>;
    },
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'endAt',
    width: 240,
    sorter: (a, b) => {
      return new Date(a.endAt).getTime() - new Date(b.endAt).getTime();
    },
    render: (value) => {
      return <p>{formatDate(value) || 'Chưa cập nhật'}</p>;
    },
  },
];
