import React, { useEffect } from 'react';

import dayjs from 'dayjs';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import { chartLabelsFormatter, tooltipConfigs, formatContentTooltipLine } from '../utils';
// import { ILineChartData } from './interfaces';

import './chart.less';

const STACKED_CHART_TYPE = {
  BAR: 'bar',
};

export function formatTooltip(this: any, chartRef) {
  console.log('formatTooltip', this);
  const type = chartRef?.chart?.options?.chart?.type;
  if (type === STACKED_CHART_TYPE.BAR) {
    return `<span class="color-n2 fw_600">${this.x}</span><br/>${this.points
      .map(
        (point) =>
          ` <div class="tooltip-items">
                <span class="left color-n4 ">
                     <span style="background-color: ${point.color
          }" class="symbol has-square"></span>
                ${point.series.userOptions.name}:
                </span> 
                <span class="ml-8 right color-n2 ">
                    ${formatNumber(point.y)}
                </span>
            </div>`
      )
      .join('')}`;
  }
  if (this.series) {
    return `
        <div class="tooltip-items">
        <span class="left">
            <span style="background-color: ${this.series.color
      }" class="symbol ${this.series.type === 'line' ? 'has-line' : 'has-square'
      }"> </span>
            ${this.series.name}:
        </span>
        <span class="ml-8 right color-n2 ">
            ${this.percentage
        ? `${this.percentage.toFixed(2)}%`
        : formatNumber(this.y)
      }${this.series.tooltipOptions.valueSuffix || ''}
        </span>
        </div>`;
  }
  const sum = this.points
    .map((item) => item.y)
    .reduce((total, item) => total + item);
  return (
    `<span class="color-n2 fw_600">Ngày ${dayjs(this.x).format(
      'DD/MM'
    )}</span><br/>` +
    `<div class="tooltip-items"><span class="left color-n4 fw_600">Tổng chi tiêu</span>
                <span class="ml-8 right color-n2 fw_600 ">
                    ${formatNumber(sum)}&nbsp;đ
                </span>
            </div>${this.points
      .map(
        (point) =>
          ` <div class="tooltip-items">
                <span class="left color-n4 ">
                ${point.series.userOptions.name}:
                </span> 
                <span class="ml-8 right color-n2 ">
                    ${formatNumber(point.y)}&nbsp;đ
                </span>
            </div>`
      )
      .join('')}`
  );
}

export function isNumber(value: any): boolean {
  return typeof value === 'number' && isFinite(value);
}

export function formatNumber(number?: string | number): string | number {
  if (!number) return 0;
  if (typeof number === 'string') {
    return number ? Number(number).toLocaleString('vi') : '';
  }
  return isNumber(number) ? number.toLocaleString('vi') : 0;
}

export function formatContentTooltipLine(this) {
  console.log(this);
  return (
    `<span class="color-n2 fw_600">${dayjs(this.x).format(
      'DD/MM/YYYY'
    )}</span><br/>` +
    `<div class="tooltip-items">
                        <span class="left">
                            <span style="background-color: ${this.point.color
    }" class="symbol ${this.point.series.userOptions.type === 'column'
      ? 'has-square'
      : 'has-line'
    }"> </span>
                            ${this.point.series.userOptions.name}:
                        </span>
                        <span class="ml-8 right color-n2 ">
                        ${formatNumber(this.point.y)}
                        </span>
                    </div>`
  );
}
export function formatContentTooltipLineShared(this) {
  const renderTooltipItems = this.points.reduce((s, point) => {
    return `${s}<div class="tooltip-items">
                         </span>
                            ${point.series.userOptions.name}:
                        </span>
                        <span class="ml-8 right color-n2">
                        ${formatNumber(point.y)}
                        </span>
                    </div>`;
  }, '');
  return `<span class="color-n2 fw_600">${dayjs(this.x).format(
    'DD/MM/YYYY'
  )}</span><br/>${renderTooltipItems}`;
}
export const tooltipConfigs = {
  backgroundColor: '#FDF7FF',
  borderRadius: '8px',
  borderColor: 'none',
  shadow: {
    color: '#000',
    offsetX: 0,
    offsetY: 0,
    opacity: 0.08,
  },
  pointFormatter: formatTooltip,
  useHTML: true,
  padding: 16,
  width: '116px',
  height: '96px',
  style: {
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: `"Roboto",sans-serif`,
    lineHeight: '20px',
    color: '#2D2D2D',
  },
};

export function test(this) {
  console.log(this);
  return this.points.reduce(function (s, point) {
    return `${s}<br/>${point.series.name}: ${point.y}m`;
  }, `<b>${this.x}</b>`);
}

export function chartLabelsFormatter() {
  // if (this.value >= 1000000000) {
  //     return `${formatNumber(this.value / 1000000000)}B`;
  // } else if (this.value >= 1000000) {
  //     return `${formatNumber(this.value / 1000000)}M`;
  // } else if (this.value >= 1000) {
  //     return `${formatNumber(this.value / 1000)}K`;
  // } else return `${formatNumber(this.value)}`;
  if (this.value >= 1000) {
    return `${formatNumber(this.value / 1000)}K`;
  }
  return `${formatNumber(this.value)}`;
}
export interface ChartDataRow {
  x: number;
  y: number;
}
export interface ILineChartData {
  name: string;
  color: string;
  data: ChartDataRow[] | any[] | undefined;
  showInLegend?: boolean;
}

type LineChartProps = {
  colors?: string[];
  series: ILineChartData[];
  xAxisType?: 'datetime' | 'string';
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { series, colors } = props;
  const xAxisType = props.xAxisType ?? 'datetime';
  const chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      height: 353,
    },
    credits: {
      enabled: false,
    },
    colors,
    title: {
      text: '',
    },
    xAxis: {
      type: xAxisType,
      labels: {
        format: () => {
          console.log("value from x axis: " + JSON.stringify(this.value));
          if (xAxisType === 'datetime') {

            return dayjs(this.value).format('DD/MM');
          }
          return this.value;
        },
      },
    },
    yAxis: {
      labels: {
        style: {
          color: '#888b90',
        },
        formatter: chartLabelsFormatter,
      },
      title: {
        text: '',
      },
      min: 0,
    },
    tooltip: {
      ...tooltipConfigs,
      split: false,
      shared: true,
      // formatter: formatContentTooltipLine,
      formatter: formatContentTooltipLineShared,
      valueSuffix: '₫',
    },
    plotOptions: {
      line: {
        cursor: 'pointer',
      },
      series: {
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 3,
        },
      },
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      margin: 36,
      itemStyle: {
        color: '#333333',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'light',
        textOverflow: 'ellipsis',
      },
      symbolRadius: 0,
    },
    series: series.map((item, index) => ({
      ...item,
      marker: {
        enabled: true,
        lineWidth: 2,
        lineColor: colors?.[index % colors?.length],
        fillColor: 'white',
      },
    })),
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      Highcharts.charts.forEach((chart) => {
        chart?.reflow();
      });
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

export default React.memo(LineChart);
