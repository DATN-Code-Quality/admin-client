import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type CourseLineChartProps = {
  chartTitle?: string;
  series: [],
  // labels: string[]
};

function CourseLineChart(props: CourseLineChartProps) {
  console.log("Series: "+JSON.stringify(props.series))
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
    // eslint-disable-next-line react/destructuring-assignment
    series: props.series,
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      {(props.series.length !== 0 && props.series[0].data.length===0)&& <div style={{ position: 'relative', top: -235, display: 'flex', justifyContent: 'center',color:'#bfbfbf' }}>No data display</div>}
    </div>
  );
}

export default CourseLineChart;
