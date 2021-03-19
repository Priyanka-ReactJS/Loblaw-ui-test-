import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Chart(props) {
// class Chart extends Component {
  const state = {
    chartData: {
      chart: {
        type: "pie", // Chart Type
        marginBottom: 100
      },
      title: {
        text: props.titleName,
        style: {
            fontSize: 40,
            fontWeight: "bold",
            color: "#000000"
          },
      },
      subtitle: {
        text:
          (
           'Performance <br>' + props.currentNumber
          ),
        floating: true,
        style: {
          fontSize: 14,
          fontWeight: "bold",
          color: "#000000"
        },
        y: 180
      },
      series: [
        {
          data: props.data
        }
      ],
      ...props.userConfig
    }
  };

    return (
      <>
        <HighchartsReact
          highcharts={Highcharts}
          options={state.chartData}
        />
      </>
    );
  
}

export default Chart;
