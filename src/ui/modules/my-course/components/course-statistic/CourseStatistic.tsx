import React, { useCallback, useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Card } from 'antd';
import Button from 'antd-button-color';
import tableExport from 'antd-table-export';

import { columnTableDetailMetrics, columnTableUser } from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { useStatistics } from '~/adapters/appService/statistics.service';
import { MAP_CONFIG_OBJECT } from '~/constant';
import { ReportCourse } from '~/domain/course';
import useDialog from '~/hooks/useDialog';
import useList from '~/hooks/useList';
import ColumnChart from '~/ui/shared/charts/ColumnChart';
import ImportedModal from '~/ui/shared/imported-modal/ImportedModal';
import ModalTable from '~/ui/shared/modal-table/ModalTable';
import TableToolbar from '~/ui/shared/toolbar';
import { getMappingLabelByValue, insertAt, splitStr } from '~/utils';

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
  const {
    getCourseMetricStatistics,
    getCourseUserStatistics,
    getCourseAssignmentStatistics,
  } = useStatistics();

  const [metricsChart, setMetricsChart] = useState<{
    labels: string[][];
    data: { name: string; data: number[] }[];
  }>({
    labels: [],
    data: [],
  });

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

  const generateSeriesByMetric = (metricObject) => {
    const series = Object.keys(metricObject).map((metric) => {
      return {
        name: getMappingLabelByValue(MAP_CONFIG_OBJECT, metric) || metric,
        data: [metricObject[metric]],
      };
    });
    return series;
  };

  const formatMetricsChart = (result) => {
    const series = generateSeriesByMetric(result);
    const label = '';
    const labels = [splitStr(label, 2)];
    return { labels, data: series };
  };

  const handleFetchMetricsChart = async () => {
    const response = await getCourseMetricStatistics(courseId);
    const { result } = response.data;
    setMetricsChart(formatMetricsChart(result));
  };

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

  useEffect(() => {
    handleFetchMetricsChart();
  }, []);

  const handleGetCourseUserStatistics = async (filter?) => {
    const response = await getCourseUserStatistics(courseId, filter);
    const { results } = response.data;
    const convertedResults = results.map((item) => {
      return {
        userId: item.user.id,
        userName: item.user.name,
        ...item.result,
      };
    });
    const updatedReponse = {
      ...response,
      data: convertedResults,
      total: convertedResults.length,
    };
    return updatedReponse;
  };
  const [selectedUserId, setSelectedUserId] = useState<any>(null);

  const handleGetDetailMetrics = async (args?) => {
    const response = await getCourseAssignmentStatistics(
      courseId,
      selectedUserId
    );
    const { results } = response.data;
    const convertedResults = results.map((item) => {
      return {
        assignmentId: item.assignment.id,
        assignmentName: item.assignment.name,
        ...item.result,
      };
    });
    const updatedReponse = {
      ...response,
      data: convertedResults,
      total: convertedResults.length,
    };
    return updatedReponse;
  };

  useEffect(() => {
    handleGetDetailMetrics();
  }, [selectedUserId]);

  const [list, { onPageChange, onFilterChange, onUpdateList }] = useList({
    fetchFn: (args) => handleGetCourseUserStatistics(args),
  });

  const columnTableUserMetrics = () => {
    let columns = columnTableUser();
    columns = insertAt(
      columns,
      {
        title: 'Detail Metrics',
        fixed: 'left',
        key: 'detail',
        render: (text, record) => {
          return (
            <Button
              type="link"
              onClick={() => {
                setSelectedUserId(record.userId);
                detailMetricsModalActions.handleOpen();
              }}
            >
              View Detail
            </Button>
          );
        },
      },
      1
    );
    return columns;
  };

  const exportToExcel = () => {
    const dataExport = list.items?.map((item) => ({
      ...item,
    }));
    const exportInstance = new tableExport(dataExport, columnTableUser());
    exportInstance.download('overview', 'xlsx');
  };

  const [detailMetricsModalVisible, detailMetricsModalActions] = useDialog();

  return (
    <>
      <Card>
        <TableToolbar title="Metrics Statistics" />
        <ColumnChart
          series={metricsChart.data}
          labels={metricsChart.labels}
          loading={loading}
        />
        <ProTable
          dataSource={list.items}
          columns={columnTableUserMetrics()}
          scroll={{ x: 1300 }}
          loading={loading}
          options={{
            reload: false,
          }}
          toolBarRender={() => {
            return (
              <Button
                type="primary"
                icon={<ExportOutlined />}
                onClick={exportToExcel}
              >
                Export to Excel
              </Button>
            );
          }}
          onReset={onFilterChange}
          request={onFilterChange}
          onFilter={onFilterChange}
        />
      </Card>
      <div className="mt-4 mb-4" />
      {/* <Card>
        <TableToolbar title="Assignments Statistics" />
        <ColumnChart
          series={dataChart.data}
          labels={dataChart.labels}
          loading={loading}
        />
        <div className="mt-4" />
        <DataTable courseReport={report.assignment} total={report.total} />
      </Card> */}
      {detailMetricsModalVisible && (
        <ModalTable
          title="Detail Metrics"
          idKey="assignmentId"
          columns={columnTableDetailMetrics()}
          fetchFn={(args) => handleGetDetailMetrics(args)}
          onOk={detailMetricsModalActions.handleClose}
          onCancel={detailMetricsModalActions.handleClose}
        />
      )}
    </>
  );
};

export default CourseStatistic;
