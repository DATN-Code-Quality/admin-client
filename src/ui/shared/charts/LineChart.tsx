import React from 'react';

import { Spin } from 'antd';
import ReactApexChart from 'react-apexcharts';

const LineChart: React.FC<{
  series: { name: string; data: number[] }[];
  labels: string[] | string[][];
  loading: boolean;
}> = ({ series, labels, loading }) => {
  // Chart options
  const options = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: labels,
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
      {loading && <Spin />}
    </div>
  );
};

export default LineChart;
