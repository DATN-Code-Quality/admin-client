import React from 'react';

import { Spin } from 'antd';
import ReactApexChart from 'react-apexcharts';

const ColumnChart: React.FC<{
  series: { name: string; data: number[] }[];
  labels: string[] | string[][];
  loading: boolean;
}> = ({ series, labels, loading }) => {
  // Chart options
  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: labels,
    },
    colors: ['#008ffb', '#00e396', '#feb019', '#ff4560', '#775dd0', '#ffee00'],
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
      {loading && <Spin />}
    </div>
  );
};

export default ColumnChart;
