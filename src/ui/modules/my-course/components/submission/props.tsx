import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';

const ISSUE_LIMIT_OPTIONS = [
  { value: 5, label: 'Top 5' },
  { value: 10, label: 'Top 10' },
  { value: 20, label: 'Top 20' },
];

export const metaFilterTopIssues = () => {
  return {
    columns: 3,
    fields: [
      {
        key: 'limit',
        colSpan: 3,
        options: ISSUE_LIMIT_OPTIONS,
        widget: 'select',
        initialValue: ISSUE_LIMIT_OPTIONS[0],
        widgetProps: {
          maxTagCount: 'responsive',
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Limit',
        },
      },
      {
        key: 'language',
        colSpan: 3,
        options: ISSUE_LIMIT_OPTIONS,
        widget: 'select',
        initialValue: ISSUE_LIMIT_OPTIONS[0],
        widgetProps: {
          maxTagCount: 'responsive',
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Language',
        },
      },
    ],
  } as IMetaFormBuilder;
};
