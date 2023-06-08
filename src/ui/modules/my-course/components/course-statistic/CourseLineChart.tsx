import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type CourseLineChartProps = {
  chartTitle?: string;
  series: [],
  // labels: string[]
};

function CourseLineChart(props: CourseLineChartProps) {
  const options = {
    title: {
      text: props.chartTitle ?? '',
      style: {
        display: 'none',
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      symbolWidth: 5,
      symbolHeight: 8,
    },
    xAxis: {
      tickColor: '#FFFFFF',
      step: 1,
      tickInterval: 1,
      labels: {
        enabled: false,
        // format: () => {
        //   console.log("title" + JSON.stringify(this.value));
        //   return props.labels[this.value];
        // }
      },
    },
    yAxis: {
      tickColor: '#FFFFFF',
      gridLineColor: '#FFFFFF',
      step: 1,
      title: {
        style: {
          display: 'none',
        },
      },
      // labels: {
      //   formatter: function () {
      //     return `$${this.value}`
      //   }
      // }
    },
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
        },
      },
    },
    tooltip: {
      shared: true,
    },
    series: props.series,
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default CourseLineChart;
