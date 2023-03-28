import React, { useEffect, useState } from 'react';

import { Button } from 'antd';

import { metaFilterDashboard, metaFilterOverview } from './props';

import { useDashboard } from '~/adapters/appService/dashboard.service';
import { usePartner } from '~/adapters/appService/partner.service';
import Card from '~/ui/shared/card';
import BaseFilter from '~/ui/shared/forms/baseFilter';
import LineChart, { ILineChartData } from '~/ui/shared/line-chart';
import Loading from '~/ui/shared/loading';
import { formatNumber } from '~/utils';
import './Dashboard.less';

function Dashboard() {
  const { getOverview } = useDashboard();
  const { getAllPartners } = usePartner();
  const [partners, setPartners] = useState<any[]>([]);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const series: any[] = data.overview;

  const handleGetListPartner = () => {
    getAllPartners().then((res) => setPartners(res.data));
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
    handleGetListPartner();
  }, []);

  return (
    <>
      <BaseFilter
        loading={loading}
        meta={metaFilterDashboard({ partners })}
        filterOnChange
        showSubmitButton={false}
        onFilter={handleFilterDashboard}
      />
      <Card className="dashboard-card card-overview" title="Overview">
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
        {series?.length > 0 && (
          <div className="overall-container">
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
          {series && <LineChart series={series} colors={[]} />}
        </div>
      </Card>
      <Card className="dashboard-card" title="Execution time">
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
      </Card>
      <>{loading && <Loading />}</>
    </>
  );
}

export default Dashboard;
