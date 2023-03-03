import React from "react";
import ChartBar from "./ChartBar";

import "./Chart.css";

function Chart({ dataPoints }) {
  const dataPointValues = dataPoints.map((dataPoint) => dataPoint.value);
  const totalMax = Math.max(...dataPointValues);
  const renderedChart = dataPoints.map((dataPoint) => {
    return (
      <ChartBar
        key={dataPoint.id}
        value={dataPoint.value}
        maxValue={totalMax}
        label={dataPoint.label}
      ></ChartBar>
    );
  });

  return <div className="chart">{renderedChart}</div>;
}

export default Chart;
