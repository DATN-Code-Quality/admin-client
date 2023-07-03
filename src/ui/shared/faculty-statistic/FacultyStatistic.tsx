import React, { useEffect, useState } from 'react';

import { ExportOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Card } from 'antd';
import Button from 'antd-button-color';
import tableExport from 'antd-table-export';

import { columnTableDetailedMetrics, columnTableUser } from './props';

import { useStatistics } from '~/adapters/appService/statistics.service';
import { MAP_CONFIG_OBJECT, PAGE_SIZE_OPTIONS } from '~/constant';
import useDialog from '~/hooks/useDialog';
import useList from '~/hooks/useList';
import ColumnChart from '~/ui/shared/charts/ColumnChart';
import ModalProTable from '~/ui/shared/modal-table/ModalProTable';
import TableToolbar from '~/ui/shared/toolbar';
import { getMappingLabelByValue, insertAt, splitStr } from '~/utils';

const FacultyStatistic: React.FC<{ courseId: string }> = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const {
    getFacultyMetricStatistics,
    getFacultyUserStatistics,
    getFacultyUserDetailedStatistics,
  } = useStatistics();

  const [metricsChart, setMetricsChart] = useState<{
    labels: string[][];
    data: { name: string; data: number[] }[];
  }>({
    labels: [],
    data: [],
  });

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
    const response = await getFacultyMetricStatistics(courseId);
    const { result } = response.data;
    setMetricsChart(formatMetricsChart(result));
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
      total: convertedResults.length,
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
    } catch(err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
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
          scroll={{ x: '1200px' }}
          responsive
          className="responsive-table"
          loading={list.isLoading}
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
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            defaultPageSize: 10,
          }}
          onReset={onFilterChange}
          request={onFilterChange}
          onFilter={onFilterChange}
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
