import React, { useCallback, useEffect, useState } from 'react';

import { Card } from 'antd';

import CourseLineChart from './CourseLineChart';
import DataTable from './DataTable';

import { useCourse } from '~/adapters/appService/course.service';
import { ReportCourse } from '~/domain/course';
import ColumnChart from '~/ui/shared/charts/ColumnChart';
import LineChart from '~/ui/shared/line-chart';
import { splitStr } from '~/utils';

type CourseReportDataLineChart = {
  name: string;
  data: number[];
  color: string;
}[];

type Report = {
  total: number;
  assignment: ReportCourse[];
};

const CourseStatistic: React.FC<{ courseId: string }> = ({ courseId }) => {
  const [report, setReport] = useState<Report>({
    total: 0,
    assignment: [],
  });

  const [dataLineChart, setDataLineChart] = useState<CourseReportDataLineChart>(
    []
  );
  const [loading, setLoading] = useState(false);

  const { getReportCourse } = useCourse();

  const formarDataLineChart = useCallback((reportData: Report) => {
    const { assignment, total } = reportData;
    const series: { name: string; data: any[]; color: string }[] = [
      { name: 'Submission Pass', data: [], color: '#11bf31' },
      { name: 'Submission Fail', data: [], color: '#de1f0d' },
      { name: 'Scan Error', data: [], color: '#f7d62f' },
      { name: 'Not Submit', data: [], color: '#82807f' },
    ];
    // setLabelsLineChart([...assignment.map((assign) => assign.assignment.name)]);
    assignment
      ?.sort((a, b) => {
        const result = a.assignment.name.localeCompare(b.assignment.name);
        console.log(`result compare: ${result}`);
        return result;
      })
      .forEach((assignmentItem: ReportCourse) => {
        const { submission } = assignmentItem;
        const waitToScan = submission?.waitToScan || 0;
        const scanning = submission?.scanning || 0;
        const fail = submission?.scanSuccess?.fail || 0;
        const pass = submission?.scanSuccess?.pass || 0;
        const error = submission?.scanFail || 0;
        const notSubmitted = total - waitToScan - scanning - fail - pass;
        // submission.
        series[0].data.push([assignmentItem.assignment.name, pass]);
        series[1].data.push([assignmentItem.assignment.name, fail]);
        series[2].data.push([assignmentItem.assignment.name, error]);
        series[3].data.push([assignmentItem.assignment.name, notSubmitted]);
      });
    return series;
  }, []);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    const response = await getReportCourse(courseId);
    if (response?.status !== 0) return;
    const reportData = response.data.report;
    const { total, assignment } = reportData;
    setReport({ total, assignment });
    setDataLineChart(formarDataLineChart(reportData));
    setLoading(false);
  }, [courseId, formarDataLineChart]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <Card>
      <CourseLineChart series={dataLineChart} chartTitle="Submission status" />
      {/* <ColumnChart
        series={dataChart.data}
        labels={dataChart.labels}
        loading={loading}
      /> */}
      <DataTable courseReport={report.assignment} total={report.total} />
    </Card>
  );
};

export default CourseStatistic;
