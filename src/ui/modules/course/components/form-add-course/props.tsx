import moment from 'moment';

import Editor from '~/ui/shared/editor';

export const metaFormAddCourse = (course?) => {
  const meta: any = {
    formItemLayout: [6, 20],
    colon: true,
    fields: [
      {
        key: 'name',
        label: 'Course Name',
        initialValue: course?.name,
        required: true,
      },
      {
        key: 'detail',
        label: 'Detail',
        initialValue: course?.detail,
        widget: Editor,
      },
      {
        key: 'summary',
        label: 'Summary',
        initialValue: course?.summary,
        widget: Editor,
      },
      {
        key: 'startAt',
        label: 'Start Date',
        initialValue: course ? moment(new Date(course?.startAt)) : null,
        widget: 'date-picker',
        required: true,
        widgetProps: {
          style: {
            width: '100%',
          },
          autoSize: { minRows: 3 },
          showCount: true,
        },
      },
      {
        key: 'endAt',
        label: 'End Date',
        initialValue: course ? moment(new Date(course?.endAt)) : null,
        widget: 'date-picker',
        required: true,
        widgetProps: {
          style: {
            width: '100%',
          },
          autoSize: { minRows: 3 },
          showCount: true,
        },
      },
    ],
  };
  return meta;
};
