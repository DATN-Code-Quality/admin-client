import dayjs from 'dayjs';

import { MAP_CHART_TYPE, MAP_SERVICE_TYPE } from '~/constant';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { addDays, generateMappingList } from '~/utils';

export const metaFilterDashboard = ({ courses }) => {
  const mappingCourseList = generateMappingList(courses, 'id', 'name');
  const currentDate = new Date();
  const last7Days = addDays(currentDate, -7);

  const dateFormat = 'DD-MM-YYYY';
  const initialRangeValue = [
    dayjs(last7Days, dateFormat),
    dayjs(currentDate, dateFormat),
  ];
  return {
    fields: [
      {
        key: 'course_id',
        options: mappingCourseList,
        widget: 'select',
        widgetProps: {
          mode: 'multiple',
          maxTagCount: 'responsive',
          style: {
            minWidth: '24rem',
            maxWidth: '24rem',
          },
          placeholder: 'Course',
          allowClear: true,
        },
      },
      {
        key: 'chart_type',
        options: MAP_CHART_TYPE,
        widget: 'select',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Type',
          allowClear: true,
        },
      },
      {
        // help: (
        //   <span className="cms-helper">
        //     <ExclamationCircleOutlined />
        //     &nbsp;Chọn thời điểm để download report theo <b>Acquired Timestamp</b>
        //   </span>
        // ),
        key: 'range_time',
        widget: 'range-picker',
        initialValue: initialRangeValue,
        widgetProps: {
          style: {
            minWidth: '16rem',
            maxWidth: '16rem',
          },
          autoSize: { maxRows: 20, minRows: 3 },
          showCount: true,
          maxLength: 300,
          placeholder: ['Start Date', 'End Date'],
          format: dateFormat,
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const metaFilterOverview = () => {
  return {
    fields: [
      {
        key: 'assignment_id',
        options: MAP_SERVICE_TYPE,
        widget: 'select',
        widgetProps: {
          style: {
            minWidth: '12rem',
            maxWidth: '12rem',
          },
          placeholder: 'Assignment',
          allowClear: true,
        },
      },
    ],
  } as IMetaFormBuilder;
};

export const metaFilterExecutionTime = () => {
  return {
    fields: [
      {
        key: 'assignment_id',
        options: MAP_SERVICE_TYPE,
        widget: 'select',
        widgetProps: {
          style: {
            minWidth: '12rem',
            maxWidth: '12rem',
          },
          placeholder: 'Assignment',
          allowClear: true,
        },
      },
    ],
  } as IMetaFormBuilder;
};
