import { MAP_USER_STATUS } from '~/constant';
import Editor from '~/ui/shared/editor';

export const metaFormAddCourse = () => {
  const meta: any = {
    formItemLayout: [6, 20],
    colon: true,
    fields: [
      {
        key: 'name',
        label: 'Tên khoá học:',
        message: 'Vui lòng không bỏ trống',
        required: true,
      },
      {
        key: 'summary',
        label: 'Mô tả:',
        required: true,
        message: 'Vui lòng không bỏ trống',
        widget: Editor,
      },
      {
        key: 'startAt',
        label: 'Ngày bắt đầu:',
        widget: 'date-picker',
        required: true,
        message: 'Vui lòng không bỏ trống',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'Ngày bắt đầu',
        },
      },
      {
        key: 'endAt',
        label: 'Ngày kết thúc:',
        widget: 'date-picker',
        required: true,
        message: 'Vui lòng không bỏ trống',
        widgetProps: {
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          placeholder: 'Ngày kết thúc',
        },
      },
    ],
  };
  return meta;
};
