import { MAP_USER_STATUS } from '~/constant';
import Editor from '~/ui/shared/editor';

export const metaFormAddCourse = () => {
  const meta: any = {
    formItemLayout: [6, 20],
    colon: true,
    fields: [
      {
        key: 'name',
        label: 'Course Name',
        required: true,
      },
      {
        key: 'summary',
        label: 'Summary',
        widget: Editor,
      },
      {
        key: 'detail',
        label: 'Detail',
        widget: Editor,
      },
      {
        key: 'startAt',
        label: 'Start Date',
        widget: 'date-picker',
        required: true,
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'Start Date',
        },
      },
      {
        key: 'endAt',
        label: 'End Date',
        widget: 'date-picker',
        required: true,
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'End Date',
        },
      },
    ],
  };
  return meta;
};
