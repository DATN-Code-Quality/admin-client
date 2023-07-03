import React, { useCallback, useEffect, useState } from 'react';

import DataTable from './DataTable';

import { useSubmission } from '~/adapters/appService/submission.service';
import PieChart from '~/ui/shared/charts/PieChart';
import { useAssignment } from '~/adapters/appService/assignment.service';
import { configObjectToConditions } from '~/utils';

const Statistic: React.FC<{ courseId: string; assignmentId: string }> = ({
  courseId,
  assignmentId,
}) => {
  const [report, setReport] = useState<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });
  const { getDetailAssignment } = useAssignment();
  const [conditions, setConditions] = useState([]);

  const [loading, setLoading] = useState(false);

  const { getReportAssignment, formatReportData } = useSubmission();
  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getReportAssignment(courseId, assignmentId);
      if (response?.status !== 0) {
        setLoading(false);
        return;
      }
      const reportData = response.data.report;
      const { total, submission } = reportData;
      const labels = [
        'Wait to scan',
        'Scanning',
        'Submission Pass',
        'Submission Fail',
        'Scan Error',
        'Not submit',
      ];
      const waitToScan = submission?.waitToScan || 0;
      const scanning = submission?.scanning || 0;
      const fail = submission?.scanSuccess.fail || 0;
      const pass = submission?.scanSuccess.pass || 0;
      const scanFail = submission?.scanFail || 0;
      const data = [
        waitToScan,
        scanning,
        pass,
        fail,
        scanFail,
        total - waitToScan - scanning - fail - pass - scanFail,
      ];

      setReport({ labels, data });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [assignmentId, courseId]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    getDetailAssignment({ courseId, assignmentId }).then((res) => {
      const data = res.data.assignment;
      setConditions(configObjectToConditions(data.configObject));
    });
  }, [assignmentId, courseId]);

  console.log('Conditions', conditions);

  return (
    <div>
      <PieChart
        series={report.data}
        labels={report.labels}
        color={[
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ]}
        loading={loading}
      />
      <div className="mt-2">
        <DataTable
          courseId={courseId}
          assignmentId={assignmentId}
          conditionsRaw={conditions}
        />
      </div>
    </div>
  );
};

export default Statistic;
