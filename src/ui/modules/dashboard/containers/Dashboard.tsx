import React, { useEffect, useState } from 'react';

import { Button } from 'antd';

import { metaFilterDashboard, metaFilterOverview } from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { useDashboard } from '~/adapters/appService/dashboard.service';
import Card from '~/ui/shared/card';
import BaseFilter from '~/ui/shared/forms/baseFilter';
import LineChart, { ILineChartData } from '~/ui/shared/line-chart';
import Loading from '~/ui/shared/loading';
import { formatNumber } from '~/utils';
import './Dashboard.less';

function Dashboard() {
  const { getOverview } = useDashboard();
  const { getAllCourses } = useCourse();
  const [courses, setCourses] = useState<any[]>([]);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const series: any[] = data.overview;

  const handleGetListCourse = () => {
    getAllCourses().then((res) => setCourses(res.data));
  };

  const fetchData = async (params?) => {
    try {
      setLoading(true);
      const { data: result } = await getOverview(params);
      const overview = result.api_overview_list.map((key) => {
        return {
          ...key,
          data: key.data.map((value) => {
            return [new Date(value.date).getTime(), value.value];
          }),
        };
      });
      result.overview = overview;
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterDashboard = (values?) => {
    fetchData(values);
  };

  const handleDownloadReport = () => {
    console.log('download report');
  };

  useEffect(() => {
    handleFilterDashboard();
    handleGetListCourse();
  }, []);

  return (
    <>
      <BaseFilter
        loading={loading}
        meta={metaFilterDashboard({ courses })}
        filterOnChange
        showSubmitButton={false}
        onFilter={handleFilterDashboard}
      />
      <Card className="dashboard-card card-overview" title="Overview">
        {series?.length > 0 && (
          <div className="overall-container">
            {/* <div className="overall-item" key="Total">
              <p className="overall-item__label">Total</p>
              <p className="overall-item__value" style={{ color: '#429EFF' }}>
                {series &&
                  series.reduce((prev, current) => prev + current.total, 0)}
              </p>
            </div> */}
            {series?.map((item) => {
              return (
                <div className="overall-item" key={item.name}>
                  <p className="overall-item__label">{item.name}</p>
                  <p
                    className="overall-item__value"
                    style={{ color: item.color }}
                  >
                    {formatNumber(item.total)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <div className="chart-container">
          {series && series?.length > 0 && (
            <LineChart series={series} colors={[]} />
          )} 
        </div>
      </Card>
      {/* <Card className="dashboard-card" title="Submission">
        <div className="action-container">
          <BaseFilter
            loading={loading}
            meta={metaFilterOverview()}
            filterOnChange
            showSubmitButton={false}
            onFilter={handleFilterDashboard}
          />
          <Button
            type="primary"
            className="action-btn"
            onClick={handleDownloadReport}
          >
            Download Report
          </Button>
        </div>
        <div className="overall-item" key="Total">
          <p className="overall-item__label">Total</p>
          <p className="overall-item__value" style={{ color: '#429EFF' }}>
            {series && series.reduce((prev, current) => prev + current.total, 0)}
          </p>
        </div>
        {series?.length > 0 && (
          <div className="overall-container">
            {series?.map((item) => {
              return (
                <div className="overall-item">
                  <p className="overall-item__label">{item.name}</p>
                  <p
                    className="overall-item__value"
                    style={{ color: item.color }}
                  >
                    {formatNumber(item.total)}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="chart-container">
          {series && <LineChart series={series} colors={[]} />}
        </div>
      </Card> */}
      <>{loading && <Loading />}</>
    </>
  );
}

export default Dashboard;
