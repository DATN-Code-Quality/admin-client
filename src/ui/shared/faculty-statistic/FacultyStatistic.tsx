import React, { useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Card, Input } from 'antd';
import Button from 'antd-button-color';

import { columnTableDetailedMetrics, columnTableUser } from './props';

import { useStatistics } from '~/adapters/appService/statistics.service';
import { MAP_CONFIG_OBJECT, PAGE_SIZE_OPTIONS } from '~/constant';
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
import { ReportType } from '~/constant/enum';
import { metaDashboardFilterReport, metaFilterReport } from '../course-statistic/props';
import BaseFilter from '../forms/baseFilter';

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

const FacultyStatistic: React.FC<{ courseId: string }> = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const [detailMetricsModalVisible, detailMetricsModalActions] = useDialog();
  const [reportType, setReportType] = useState<ReportType>(
    ReportType.METRICS_TYPE
  );

  const {
    getFacultyMetricStatistics,
    getFacultyUserStatistics,
    getFacultyUserDetailedStatistics,
  } = useStatistics();
  const [typeMetricsChart, setTypeMetricsChart] = useState<{
    labels: string[][];
    data: { name: string; data: number[] }[];
  }>({
    labels: [],
    data: [],
  });

  const [severityMetricsChart, setSeverityMetricsChart] = useState<{
    labels: string[][];
    data: { name: string; data: number[] }[];
  }>({
    labels: [],
    data: [],
  });

  const handleFetchMetricsChart = async () => {
    const response = await getFacultyMetricStatistics(courseId);
    const { result } = response.data;
    const typeChartData = {
      violations: result.violations ?? '0',
      code_smells: result.code_smells ?? '0',
      bugs: result.bugs ?? '0',
      vulnerabilities: result.vulnerabilities ?? '0',
      duplicated_lines_density: result.duplicated_lines_density ?? '0',
      coverage: result.coverage ?? '0',
    };
    const severityChartData = {
      blocker_violations: result.blocker_violations ?? '0',
      critical_violations: result.critical_violations ?? '0',
      major_violations: result.major_violations ?? '0',
      minor_violations: result.minor_violations ?? '0',
      info_violations: result.info_violations ?? '0',
    };
    setTypeMetricsChart(formatMetricsChart(typeChartData));
    setSeverityMetricsChart(formatMetricsChart(severityChartData));
  };

  useEffect(() => {
    handleFetchMetricsChart();
  }, []);

  const handleGetFacultyUserStatistics = async (filter?) => {
    const response = await getFacultyUserStatistics(filter);
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
    try {
      const response = await getFacultyUserDetailedStatistics(selectedUserId);
      const { courses, results } = response.data;
      const convertedResults = results.map((item) => {
        const currentCourse = courses.find(
          (course) => course.id === item.assignment.courseId
        );
        return {
          courseId: currentCourse?.id,
          courseName: currentCourse?.name,
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
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    if (!selectedUserId) return;
    handleGetDetailMetrics();
  }, [selectedUserId]);

  const [list, { onPageChange, onFilterChange, onUpdateList }] = useList({
    fetchFn: (args) => handleGetFacultyUserStatistics(args),
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
        <TableToolbar title="Metrics Statistics">
          <BaseFilter
            loading={list.isLoading}
            meta={metaDashboardFilterReport()}
            onFilter={(value) => setReportType(value.type)}
            filterOnChange
            showSubmitButton={false}
            formProps={{
              style: {
                marginBottom: 0,
              },
            }}
          />
        </TableToolbar>
        {reportType === ReportType.METRICS_TYPE && (
          <>
            <ColumnChart
              series={typeMetricsChart.data}
              labels={typeMetricsChart.labels}
              loading={loading}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              Number of metric types in course
            </div>
          </>
        )}
        {reportType === ReportType.METRICS_SEVERITY && (
          <>
            <ColumnChart
              series={severityMetricsChart.data}
              labels={severityMetricsChart.labels}
              loading={loading}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              Number of severity types in course
            </div>
          </>
        )}
        <ProTable
          dataSource={list.items}
          search={false}
          columns={columnTableUserMetrics()}
          scroll={{ x: '1200px' }}
          responsive
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
                    'faculty_metrics'
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
      {detailMetricsModalVisible && (
        <ModalProTable
          title="Detailed Metrics"
          idKey="assignmentId"
          columns={columnTableDetailedMetrics()}
          fetchFn={(args) => handleGetDetailMetrics(args)}
          onOk={detailMetricsModalActions.handleClose}
          onCancel={detailMetricsModalActions.handleClose}
        />
      )}
    </>
  );
};

export default FacultyStatistic;
