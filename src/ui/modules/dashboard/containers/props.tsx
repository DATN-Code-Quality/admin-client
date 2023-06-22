import dayjs from 'dayjs';

import { MAP_CHART_TYPE, MAP_SERVICE_TYPE } from '~/constant';
import { IMetaFormBuilder } from '~/ui/shared/forms/FormBuilder/FormBuilder';
import { addDays, generateMappingList } from '~/utils';

export const metaFilterDashboard = ({ courses }) => {
  const mappingCourseList = generateMappingList(courses, 'id', 'name');
  const currentDate = new Date();
  const last7Days = addDays(currentDate, -7);
  const width = window.innerWidth;
  const dateFormat = 'DD-MM-YYYY';
  const initialRangeValue = [
    dayjs(last7Days, dateFormat),
    dayjs(currentDate, dateFormat),
  ];
  return {
    columns: 3,
    fields: [
      {
        key: 'course_id',
        colSpan: 3,
        options: mappingCourseList,
        widget: 'select',
        widgetProps: {
          mode: 'multiple',
          maxTagCount: 'responsive',
          style: {
            minWidth: width < 768 ? '100%' : '24rem',
            maxWidth: width < 768 ? '100%' : '24rem',
          },
          placeholder: 'Course',
          allowClear: true,
        },
      },
      {
        key: 'chart_type',
        colSpan: 3,
        options: MAP_CHART_TYPE,
        widget: 'select',
        initialValue: MAP_CHART_TYPE[0],
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Type',
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
        colSpan: 3,
        widget: 'range-picker',
        initialValue: initialRangeValue,
        widgetProps: {
          style: {
            width: '100%',
          },
          autoSize: { minRows: 3 },
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
