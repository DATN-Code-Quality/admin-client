import React, { useCallback, useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Card, Input } from 'antd';
import Button from 'antd-button-color';

import BaseFilter from '../forms/baseFilter';

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

const CourseMetricsStatistic: React.FC<{ courseId: string }> = ({
  courseId,
}) => {
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState<ReportType>(
    ReportType.ISSUE_TYPE
  );
  const {
    getCourseMetricStatistics,
    getCourseUserStatistics,
    getCourseUserDetailedStatistics,
  } = useStatistics();

  const [detailMetricsModalVisible, detailMetricsModalActions] = useDialog();
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
    const response = await getCourseMetricStatistics(courseId);
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

  const handleFilterReportType = (values) => {
    setReportType(values.type);
  };

  return (
    <>
      <Card>
        <TableToolbar title="Course reports">
          <BaseFilter
            loading={list.isLoading}
            meta={metaFilterReport()}
            onFilter={handleFilterReportType}
            filterOnChange
            showSubmitButton={false}
            formProps={{
              style: {
                marginBottom: 0,
              },
            }}
          />
        </TableToolbar>
        {reportType === ReportType.ISSUE_TYPE && (
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
              Average number of issues by type
            </div>
          </>
        )}
        {reportType === ReportType.ISSUE_SEVERITY && (
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
              Average number of issues by severity
            </div>
          </>
        )}
        {reportType === ReportType.TOP_ISSUES && (
          <>
            <div className="mt-2">
              <TopIssues
                courseId={courseId}
                assignmentId={null}
                type="course"
              />
            </div>
            <div className="mt-4 mb-4" />
            <div className="mt-4 mb-4" />
          </>
        )}

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

export default CourseMetricsStatistic;
