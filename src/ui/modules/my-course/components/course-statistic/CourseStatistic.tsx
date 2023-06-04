import React, { useCallback, useEffect, useState } from 'react';

import { Card } from 'antd';

import DataTable from './DataTable';

import { useCourse } from '~/adapters/appService/course.service';
import { ReportCourse } from '~/domain/course';
import ColumnChart from '~/ui/shared/charts/ColumnChart';
import { splitStr } from '~/utils';

const CourseStatistic: React.FC<{ courseId: string }> = ({ courseId }) => {
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
        { name: 'Submission Pass', data: [] },
        { name: 'Submission Fail', data: [] },
        { name: 'Scan Error', data: [] },
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
        series[0].data.push(pass);
        series[1].data.push(fail);
        series[2].data.push(scanFail);
        series[3].data.push(
          (total || 0) - waitToScan - scanning - fail - pass - scanFail
        );
      });
      return { labels, data: series };
    },
    []
  );

  const fetchReport = useCallback(async () => {
    setLoading(true);
    const response = await getReportCourse(courseId);
    if (response?.status !== 0) return;
    const reportData = response.data.report;
    const { total, assignment } = reportData;

    setReport({ total, assignment });
    setDataChart(formatDataChart(total, assignment));
    setLoading(false);
  }, [courseId, formatDataChart]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <Card>
      <ColumnChart
        series={dataChart.data}
        labels={dataChart.labels}
        loading={loading}
      />
      <DataTable courseReport={report.assignment} total={report.total} />
    </Card>
  );
};

export default CourseStatistic;
