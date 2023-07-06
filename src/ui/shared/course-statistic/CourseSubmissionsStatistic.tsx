import React, { useCallback, useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Card, Input } from 'antd';
import Button from 'antd-button-color';

import BaseFilter from '../forms/baseFilter';

import DataTable from './DataTable';
import {
  columnTableDetailMetrics,
  columnTableUser,
  metaFilterReport,
} from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { useStatistics } from '~/adapters/appService/statistics.service';
import { MAP_CONFIG_OBJECT, PAGE_SIZE_OPTIONS } from '~/constant';
import { ReportType } from '~/constant/enum';
import { ReportCourse } from '~/domain/course';
import useDialog from '~/hooks/useDialog';
import useList from '~/hooks/useList';
import TopIssues from '~/ui/modules/my-course/components/submission/TopIssues';
import ColumnChart from '~/ui/shared/charts/ColumnChart';
import ModalProTable from '~/ui/shared/modal-table/ModalProTable';
import TableToolbar from '~/ui/shared/toolbar';
import {
  debounce,
  getMappingLabelByValue,
  handleExportToExcel,
  insertAt,
  splitStr,
} from '~/utils';

const CourseSubmissionsStatistic: React.FC<{ courseId: string }> = ({
  courseId,
}) => {
  const [report, setReport] = useState<{
    total: number;
    assignment: ReportCourse[];
  }>({
    total: 0,
    assignment: [],
  });
  const [loading, setLoading] = useState(false);
  const [dataChart, setDataChart] = useState<{
    labels: string[][];
    data: { name: string; data: number[] }[];
  }>({
    labels: [],
    data: [],
  });
  const { getReportCourse } = useCourse();
  const formatDataChart = useCallback(
    (total: number, assignment: ReportCourse[]) => {
      const series: { name: string; data: number[] }[] = [
        { name: 'Wait to Scan', data: [] },
        { name: 'Scanning', data: [] },
        { name: 'Submission Pass', data: [] },
        { name: 'Submission Fail', data: [] },
        { name: 'Error', data: [] },
        { name: 'Not Submit', data: [] },
      ];
      const labels: string[][] = [];
      assignment?.forEach((assignmentItem: ReportCourse) => {
        labels.push(splitStr(assignmentItem.assignment.name || '', 2));

        const { submission } = assignmentItem;
        const waitToScan = submission?.waitToScan || 0;
        const scanning = submission?.scanning || 0;
        const fail = submission?.scanSuccess?.fail || 0;
        const pass = submission?.scanSuccess?.pass || 0;
        const scanFail = submission?.scanFail || 0;
        series[0].data.push(waitToScan);
        series[1].data.push(scanning);
        series[2].data.push(pass);
        series[3].data.push(fail);
        series[4].data.push(scanFail);
        series[5].data.push(
          (total || 0) - waitToScan - scanning - fail - pass - scanFail
        );
      });
      return { labels, data: series };
    },
    []
  );

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await getReportCourse(courseId);
      if (response?.status !== 0) return;
      const reportData = response.data.report;
      const { total, assignment } = reportData;

      setReport({ total, assignment });
      setDataChart(formatDataChart(total, assignment));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <>
      <Card>
        <TableToolbar title="Submissions Reports" />
        <ColumnChart
          series={dataChart.data}
          labels={dataChart.labels}
          loading={loading}
        />
        <div className="mt-4" />
        <DataTable courseReport={report.assignment} total={report.total} />
      </Card>
    </>
  );
};

export default CourseSubmissionsStatistic;
