import React, { useCallback, useEffect, useState } from 'react';

import { Card } from 'antd';

import { useCourse } from '~/adapters/appService/course.service';
import { ReportCourse } from '~/domain/course';
import ColumnChart from '~/ui/shared/charts/ColumnChart';

const CourseStatistic: React.FC<{ id: string }> = ({ id }) => {
  const [report, setReport] = useState<{
    labels: string[];
    data: { name: string; data: number[] }[];
  }>({
    labels: [],
    data: [],
  });
  const [loading, setLoading] = useState(false);

  const { getReportCourse } = useCourse();
  const fetchReport = useCallback(async () => {
    setLoading(true);
    // const response = await getReportCourse(id);
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

    const series: { name: string; data: number[] }[] = [
      { name: 'Wait to scan', data: [] },
      { name: 'Scanning', data: [] },
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
      series[0].data.push(waitToScan);
      series[1].data.push(scanning);
      series[2].data.push(fail);
      series[3].data.push(pass);
      series[4].data.push(scanFail);
      series[5].data.push(
        total - waitToScan - scanning - fail - pass - scanFail
      );
    });

    setReport({ labels, data: series });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  console.log(report);
  return (
    <Card>
      <ColumnChart
        series={report.data}
        labels={report.labels}
        loading={loading}
      />
    </Card>
  );
};

export default CourseStatistic;
