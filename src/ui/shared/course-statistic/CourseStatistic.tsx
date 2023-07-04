import React, { useCallback, useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Card, Input } from 'antd';
import Button from 'antd-button-color';
import tableExport from 'antd-table-export';

import { columnTableDetailMetrics, columnTableUser } from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { useStatistics } from '~/adapters/appService/statistics.service';
import { MAP_CONFIG_OBJECT, PAGE_SIZE_OPTIONS } from '~/constant';
import { ReportCourse } from '~/domain/course';
import useDialog from '~/hooks/useDialog';
import useList from '~/hooks/useList';
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
    getCourseUserDetailedStatistics,
  } = useStatistics();

  const [detailMetricsModalVisible, detailMetricsModalActions] = useDialog();
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

  const handleFetchMetricsChart = async () => {
    const response = await getCourseMetricStatistics(courseId);
    const { result } = response.data;
    setMetricsChart(formatMetricsChart(result));
  };

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
      total: response.data.total,
    };
    return updatedReponse;
  };
  const [selectedUserId, setSelectedUserId] = useState<any>(null);

  const handleGetDetailMetrics = async (args?) => {
    const response = await getCourseUserDetailedStatistics(
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
    if (!selectedUserId) return;
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
        title: 'Detailed Metrics',
        fixed: 'left',
        width: 120,
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
              View Details
            </Button>
          );
        },
      },
      1
    );
    return columns;
  };

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
          scroll={{ x: '1200px' }}
          responsive
          search={false}
          className="responsive-table"
          loading={list.isLoading}
          options={{
            reload: false,
          }}
          toolBarRender={() => {
            return [
              <Input
                key="search"
                placeholder="Username, Name or Email"
                onChange={debounce((e) => {
                  const filter = {
                    search: e.target.value,
                  };
                  onFilterChange(filter);
                }, 200)}
              />,
              <Button
                key="export"
                type="primary"
                icon={<ExportOutlined />}
                onClick={() =>
                  handleExportToExcel(
                    list.items,
                    columnTableUser(),
                    'course_metrics'
                  )
                }
              >
                Export to Excel
              </Button>,
            ];
          }}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            defaultPageSize: 10,
            total: list.total,
          }}
          // onReset={onFilterChange}
          // request={onFilterChange}
          // onFilter={onFilterChange}
          onChange={onPageChange}
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
        <ModalProTable
          title="Detailed Metrics"
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
