import { MAP_USER_STATUS } from '~/constant';
import Editor from '~/ui/shared/editor';

export const metaFormAddCourse = () => {
  const meta: any = {
    formItemLayout: [6, 20],
    colon: true,
    fields: [
      {
        key: 'name',
        label: 'Course Name:',
        required: true,
      },
      {
        key: 'description',
        label: 'Description:',
        required: true,
        widget: Editor,
      },
      {
        key: 'status',
        label: 'Status:',
        options: MAP_USER_STATUS,
        widget: 'select',
        required: true,
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          allowClear: true,
        },
      },
    ],
  };
  return meta;
};

// export const metaUpdateCourse = (record) => {
//   const meta: any = {
//     formItemLayout: [6, 20],
//     fields: [
//       {
//         key: 'name',
//         label: 'Partner Name:',
//         required: true,
//         initialValue: record.name,
//         message: 'Please input',
//         widgetProps: {
//           placeholder: 'Input Partner Name',
//         },
//       },
//     ],
//   };
//   return meta;
// };
