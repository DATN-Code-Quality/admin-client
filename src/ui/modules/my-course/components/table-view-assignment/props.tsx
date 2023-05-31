import { ColumnType } from 'antd/lib/table';
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
          placeholder: 'Nhập từ khoá cần tìm',
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const columnTableAssignment = (setAssignment): ColumnType<any>[] => [
  {
    title: 'Tên bài tập',
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    render: (value, record, index) => {
      const assignment=record as Assignment;
      const assignmentUrl = generateUrl(ROUTE.MY_COURSE.ASSIGN, {
        id: assignment.id,
        course_id: assignment.courseId,
      });
      console.log("Navigate url: "+assignmentUrl);
      // TODO: handle link later
      return (
          <a href={assignmentUrl}>{value}</a>
      );
    },
  },
  {
    title: 'Hạn nộp',
    dataIndex: 'dueDate',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return (a, b) => a.dueDate - b.dueDate;
    },
    render: (value, record, index) => {
      return <p>{formatDate(value) || 'Chưa cập nhật'}</p>;
    },
  },
];

export const metaFilterSyncAssignment = () => {
  return {
    fields: [
      {
        key: 'search',
        widgetProps: {
          placeholder: 'Nhập từ khoá cần tìm',
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const columnTableSyncAssignment = (): ColumnType<any>[] => [
  {
    title: 'Tên bài tập',
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  },
  {
    title: 'Hạn nộp',
    dataIndex: 'dueDate',
    width: 200,
    ellipsis: true,
    sorter: (a, b) => {
      return (a, b) => a.dueDate - b.dueDate;
    },
    render: (value, record, index) => {
      return <p>{formatDate(value) || 'Chưa cập nhật'}</p>;
    },
  },
];
