/* eslint-disable import/no-extraneous-dependencies */
import { Spin } from 'antd';
import React, { useMemo } from 'react';

import ReactApexChart from 'react-apexcharts';

const PieChart: React.FC<{
  series: number[] | string[];
  labels: string[];
  color: string[];
  loading: boolean;
}> = ({ series, labels, color, loading }) => {
  const chartOptions = useMemo(
    () => ({
      chart: {
        width: 500,
        type: 'pie',
      },
      labels,
      colors: color,
      dataLabels: {
        formatter: function (val, opt) {
          console.log(val);
          return val !== 0 ? val : 'jkljl';
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    }),
    [labels, color]
  );
  return (
    <div style={{ width: '100%' }} className="flex items-center justify-center">
      {!loading && series?.length > 0 && (
        <ReactApexChart
          options={chartOptions}
          type="pie"
          width="500"
          series={series}
        />
      )}
      {loading && <Spin />}
    </div>
  );
};

export default PieChart;
