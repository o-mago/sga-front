import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../style/Chart.css';

const chartOptionsDefault = {
  title: {
    style: {
      fontSize: '20px'
    },
    text: ''
  },
  subtitle: {
    style: {
      fontSize: '16px'
    },
    text: ''
  },
  xAxis: {
    style: {
      fontSize: '16px'
    },
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    style: {
      fontSize: '14px'
    },
    labels: {
      formatter: function () { }
    },
    gridLineWidth: 0,
    title: {
      text: 'Number of Issues'
    }
  },
  tooltip: {
    style: {
      fontSize: '14px'
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true,
        style: {
          zIndex: 1,
          fontSize: '14px'
        }
      }
    }
  },
  series: [{
    name: "Planned",
    color: '#BD6109',
    data: []
  }, {
    name: "Delivered",
    color: '#3E4A69',
    data: []
  }],

  exporting: {
    chartOptions: {
      chart: {
        width: 1024,
        height: 768
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      }
    }
  },
  credits: {
    enabled: false
  }
}

const Chart = (props) => {
  var plannedChart = props.data['Planned'].slice(0,12).reduce((acc, elem, ind) => {
    acc[ind - 1] ? acc.push(elem + acc[ind - 1]) : acc.push(elem);
    return acc;
  }, []);

  let deliveredUntilToday = props.year <= (new Date).getFullYear() ? props.data['Done'].slice(0, props.month + 1) : [];

  var deliveredChart = deliveredUntilToday.reduce((acc, elem, ind) => {
    acc[ind - 1] ? acc.push(elem + acc[ind - 1]) : acc.push(elem);
    return acc;
  }, []);

  chartOptionsDefault.series[0].data = plannedChart;
  chartOptionsDefault.series[1].data = deliveredChart;
  
  return (
    <div id="chart_wrap" className="wrap animate-fadein">
      <HighchartsReact containerProps={{ id: "chart_area", className: "box" }} highcharts={Highcharts} options={chartOptionsDefault} />
    </div>
  );
}

export default Chart;