/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';

import ApexChart from 'react-apexcharts';

const PieChart = () => {
  const chartOptions = useMemo(
    () => ({
      labels: ['Red', 'Blue', 'Green', 'Yellow'],
      series: [44, 55, 13, 33],
      colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019'],
      legend: {
        position: 'bottom',
      },
    }),
    []
  );

  return (
    <div>
      <ApexChart options={chartOptions} type="pie" width="380" />
    </div>
  );
};

export default PieChart;
