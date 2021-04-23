import React, { Component } from "react";
import Plot from "react-plotly.js";
import dataMQTT from "../dataMQTT.json";

export default class GraphicplotRealTime extends Component {
  dataReader = () => {
    let arr = [];
    const x = [];
    const y = [];
    dataMQTT.array.forEach((data) => {
      const { timestamp, value } = data;

      x.push(timestamp);
      y.push(value.substr(1, 7));
    });

    arr["x"] = x;
    arr["y"] = y;
    return arr;
  };

  render() {
    const arr = this.dataReader();
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
            title: "CHART plot real time",
          }}
        ></Plot>
      </div>
    );
  }
}
