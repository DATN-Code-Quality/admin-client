import React, { useCallback, useEffect, useState } from 'react';

import { Card } from 'antd';

import DataTable from './DataTable';

import { useCourse } from '~/adapters/appService/course.service';
import { ReportCourse } from '~/domain/course';
import ColumnChart from '~/ui/shared/charts/ColumnChart';

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
    labels: string[];
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
        { name: 'Submission Error', data: [] },
        { name: 'Not Submit', data: [] },
      ];
      const labels: string[] = [];
      assignment?.forEach((assignmentItem: ReportCourse) => {
        labels.push(assignmentItem.assignment.name);
        const { submission } = assignmentItem;
        const waitToScan = submission?.waitToScan || 0;
        const scanning = submission?.scanning || 0;
        const fail = submission?.scanSuccess?.fail || 0;
        const pass = submission?.scanSuccess?.pass || 0;
        const scanFail = submission?.scanFail || 0;
        series[0].data.push(fail);
        series[1].data.push(pass);
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
    // const response = await getReportCourse(courseId);
    const response = {
      status: 0,
      data: {
        report: {
          total: 9,
          assignment: [
            {
              assignment: {
                id: '41633f7b-3dd2-46d1-bf6a-6ec2b36e0623',
                name: 'Tuần 5',
              },
              submission: {
                waitToScan: 7,
                scanSuccess: {},
              },
            },
            {
              assignment: {
                id: '52e85d3d-c5d3-4942-a014-0f0cfa709ac0',
                name: 'Tuần 18',
              },
              submission: {
                scanSuccess: {},
              },
            },
            {
              assignment: {
                id: '7b134c9e-0090-4745-8a7b-4117704721e0',
                name: 'Tuần 18',
              },
              submission: {
                scanSuccess: {
                  fail: 1,
                },
                scanFail: 1,
              },
            },
            {
              assignment: {
                id: '91c1e7db-f11a-41b2-baf4-2cf79fd5cbdf',
                name: 'Tuần 6',
              },
              submission: {
                waitToScan: 6,
                scanSuccess: {},
              },
            },
            {
              assignment: {
                id: 'a963b7da-cad7-4254-bb2a-e963b7161a65',
                name: 'Tuần 4',
              },
              submission: {
                waitToScan: 7,
                scanSuccess: {},
              },
            },
          ],
        },
        role: 'teacher',
      },
    };
    if (response?.status !== 0) return;
    const reportData = response.data.report;
    const { total, assignment } = reportData;

    setReport({ total, assignment });
    setDataChart(formatDataChart(total, assignment));
    setLoading(false);
  }, [formatDataChart]);

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
