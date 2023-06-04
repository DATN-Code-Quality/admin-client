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

const CourseStatistic: React.FC<{ courseId: string }> = ({ courseId }) => {
  const [report, setReport] = useState<{
    total: number;
    assignment: ReportCourse[];
  }>({
    total: 0,
    assignment: [],
  });

  const [dataLineChart, setDataLineChart] = useState<CourseReportDataLineChart>(
    []
  );
  const [labelsLineChart, setLabelsLineChart] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataChart, setDataChart] = useState<{
    labels: string[][];
    data: { name: string; data: number[] }[];
  }>({
    labels: [],
    data: [],
  });
  const { getReportCourse } = useCourse();

  const formarDataLineChart = useCallback((assignment: ReportCourse[]) => {
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
        const notSubmitted = 0;
        // submission.
        series[0].data.push([assignmentItem.assignment.name, pass]);
        series[1].data.push([assignmentItem.assignment.name, fail]);
        series[2].data.push([assignmentItem.assignment.name, error]);
        series[3].data.push([assignmentItem.assignment.name, notSubmitted]);
      });
    return series;
  }, []);

  const formatDataChart = useCallback(
    (total: number, assignment: ReportCourse[]) => {
      const series: { key: string; name: string; data: number[] }[] = [
        { key: 'pass', name: 'Submission Pass', data: [] },
        { key: 'fail', name: 'Submission Fail', data: [] },
        { key: 'error', name: 'Scan Error', data: [] },
        { key: 'notsubmit', name: 'Not Submit', data: [] },
      ];
      const labels: string[][] = [];
      assignment?.forEach((assignmentItem: ReportCourse) => {
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

    // console.info("Report data: "+JSON.stringify(reportData))
    // console.log("Series format: " + JSON.stringify(formarDataLineChart(assignment)));
    setDataLineChart(formarDataLineChart(assignment));
    setReport({ total, assignment });
    setDataChart(formatDataChart(total, assignment));
    setLoading(false);
  }, [courseId, formatDataChart]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);
  console.log(`Data line chart:  ${JSON.stringify(dataLineChart)}`);
  console.log(`labels${JSON.stringify(labelsLineChart)}`);

  return (
    <Card>
      <CourseLineChart series={dataLineChart} />
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
