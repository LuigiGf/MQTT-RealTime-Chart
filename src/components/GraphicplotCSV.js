import React, { Component } from "react";
import Plot from "react-plotly.js";

export default class Graphicplot extends Component {
  transformData = (entry) => {
    let plot_data = [];
    let x = [];
    let y = [];
    this.props.inputCSV.map((each) => {
      const { timestamp, value } = each;
      if (
        timestamp.getMinutes() === 0 &&
        timestamp.getSeconds() === 4 &&
        timestamp.getHours() === 12
      ) {
        x.push(timestamp);
        y.push(value.substr(2, 6));
      }
    });
    x.sort((a, b) => a.getSeconds() - b.getSeconds());
    x.sort((a, b) => a.getMinutes() - b.getMinutes());
    x.sort((a, b) => a.getHours() - b.getHours());
    x.sort((a, b) => a.getDate() - b.getDate());
    x.sort((a, b) => a.getMonth() - b.getMonth());
    plot_data["x"] = x;
    plot_data["y"] = y;
    return plot_data;
  };

  render() {
    const arr = this.transformData();
    return (
      <div>
        <Plot
          data={[
            {
              type: "scatter",
              x: arr["x"],
              y: arr["y"],
            },
          ]}
          layout={{
            width: 1280,
            height: 720,
            title: "Chart plot CSV",
          }}
        ></Plot>
      </div>
    );
  }
}
