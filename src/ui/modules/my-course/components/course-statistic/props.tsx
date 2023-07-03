/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unsafe-optional-chaining */
import { ColumnType } from 'antd/lib/table';

import { MAP_ROLES } from '~/constant';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';

export const metaFilterUser = () => {
  return {
    columns: 3,
    fields: [
      {
        key: 'search',
        colSpan: 3,
        widgetProps: {
          placeholder: 'Search by Name or Email',
          allowClear: true,
          style: {
            minWidth: '250px',
          },
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const columnTableUser = (): ColumnType<any>[] => [
  {
    title: 'Name',
    dataIndex: 'userName',
    key: 'userName',
    fixed: 'left',
    sorter: {
      compare: (a, b) => {
        return a.userName.localeCompare(b.userName);
      },
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    children: [
      {
        title: 'Bugs',
        dataIndex: 'bugs',
        key: 'bugs',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.bugs ?? '0'));
            const val_b = Math.floor(parseFloat(b.bugs ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Code Smells',
        dataIndex: 'code_smells',
        key: 'codeSmell',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.code_smells ?? '0'));
            const val_b = Math.floor(parseFloat(b.code_smells ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Vulnerabilities',
        dataIndex: 'vulnerabilities',
        key: 'vulnerabilities',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.vulnerabilities ?? '0'));
            const val_b = Math.floor(parseFloat(b.vulnerabilities ?? '0'));
            return val_a - val_b;
          },
        },
      },
    ],
  },

  {
    title: 'Severity',
    dataIndex: 'type',
    key: 'type',
    children: [
      {
        title: 'Blocker',
        dataIndex: 'blocker_violations',
        key: 'blocker',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.blocker_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.blocker_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Critical',
        dataIndex: 'critical_violations',
        key: 'critical',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.critical_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.critical_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Major',
        dataIndex: 'major_violations',
        key: 'major',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.major_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.major_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Minor',
        dataIndex: 'minor_violations',
        key: 'minor',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.minor_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.minor_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Info',
        dataIndex: 'info_violations',
        key: 'info',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.info_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.info_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
    ],
  },

  {
    title: 'Duplicated Lines Density',
    dataIndex: 'duplicated_lines_density',
    key: 'duplicatedLinesDensity',
    align: 'center',
    sorter: {
      compare: (a, b) => {
        const val_a = Math.floor(parseFloat(a.duplicated_lines_density ?? '0'));
        const val_b = Math.floor(parseFloat(b.duplicated_lines_density ?? '0'));
        return val_a - val_b;
      },
    },
  },
];

export const columnTableDetailMetrics = (): ColumnType<any>[] => [
  {
    title: 'Name',
    dataIndex: 'assignmentName',
    key: 'assignmentName',
    fixed: 'left',
    sorter: {
      compare: (a, b) => {
        return a.assignmentName.localeCompare(b.assignmentName);
      },
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    children: [
      {
        title: 'Bugs',
        dataIndex: 'bugs',
        key: 'bugs',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.bugs ?? '0'));
            const val_b = Math.floor(parseFloat(b.bugs ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Code Smells',
        dataIndex: 'code_smells',
        key: 'codeSmell',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.code_smells ?? '0'));
            const val_b = Math.floor(parseFloat(b.code_smells ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Vulnerabilities',
        dataIndex: 'vulnerabilities',
        key: 'vulnerabilities',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.vulnerabilities ?? '0'));
            const val_b = Math.floor(parseFloat(b.vulnerabilities ?? '0'));
            return val_a - val_b;
          },
        },
      },
    ],
  },

  {
    title: 'Severity',
    dataIndex: 'type',
    key: 'type',
    children: [
      {
        title: 'Blocker',
        dataIndex: 'blocker_violations',
        key: 'blocker',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.blocker_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.blocker_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Critical',
        dataIndex: 'critical_violations',
        key: 'critical',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.critical_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.critical_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Major',
        dataIndex: 'major_violations',
        key: 'major',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.major_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.major_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Minor',
        dataIndex: 'minor_violations',
        key: 'minor',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.minor_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.minor_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
      {
        title: 'Info',
        dataIndex: 'info_violations',
        key: 'info',
        align: 'center',
        sorter: {
          compare: (a, b) => {
            const val_a = Math.floor(parseFloat(a.info_violations ?? '0'));
            const val_b = Math.floor(parseFloat(b.info_violations ?? '0'));
            return val_a - val_b;
          },
        },
      },
    ],
  },

  {
    title: 'Duplicated Lines Density',
    dataIndex: 'duplicated_lines_density',
    key: 'duplicatedLinesDensity',
    align: 'center',
    sorter: {
      compare: (a, b) => {
        const val_a = Math.floor(parseFloat(a.duplicated_lines_density ?? '0'));
        const val_b = Math.floor(parseFloat(b.duplicated_lines_density ?? '0'));
        return val_a - val_b;
      },
    },
  },
];
