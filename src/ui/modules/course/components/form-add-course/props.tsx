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
        key: 'Detail',
        label: 'Detail',
        widget: Editor,
      },
      {
        key: 'summary',
        label: 'Summary',
        widget: Editor,
      },
      {
        key: 'startAt',
        label: 'Start Date',
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
