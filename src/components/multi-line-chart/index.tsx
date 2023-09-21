import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export interface ChartProps {
  title: string;
}

const MultiChart = ({ title }: { title: string }) => {
  const [series, setSeries] = useState([
    {
      name: "Week 1",
      type: "line",
      data: [44, 55, 41, 67, 22, 43, 21],
    },
    {
      name: "Week 2",
      type: "line",
      data: [30, 25, 36, 30, 45, 35, 64],
    },
    {
      name: "Week 3",
      type: "line",
      data: [11, 32, 23, 16, 45, 35, 33],
    },
    {
      name: "Week 4",
      type: "line",
      data: [21, 30, 23, 26, 15, 55, 63],
    },
    {
      name: "Golden Week",
      type: "line",
      data: [41, 20, 33, 56, 25, 35, 33],
    },
    {
      name: "Golden Upper Bound",
      type: "line",
      data: [61, 60, 63, 56, 45, 40, 37],
    },
    {
      name: "Golden Lower Bound",
      type: "line",
      data: [11, 20, 33, 46, 25, 20, 17],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    colors: [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#00ffff",
      "#ffd700",
      "#ffd700",
      "#ffd700",
    ],
    grid: {
      show: true, // Show grid lines
      position: "back", // Show grid lines behind the chart series
      xaxis: {
        lines: {
          show: true, // Show vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: true, // Show horizontal grid lines
        },
      },
    },
    stroke: {
      width: [3, 3, 3, 3, 3, 5, 5],
      curve: "smooth",
    },
    // plotOptions: {
    //   bar: {
    //     columnWidth: "50%",
    //   },
    // },
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    markers: {
      size: 5,
    },
    xaxis: {
      type: "string",
    },
    yaxis: {
      // title: {
      //   text: "Points",
      // },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y: number) {
          if (typeof y !== "undefined") {
            return y.toFixed(0);
          }
          return y;
        },
      },
    },
  });

  return (
    <Card>
      <CardContent>
        <Typography sx={{ textAlign: "center", fontSize: "1.2rem" }}>
          {title}
        </Typography>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </CardContent>
    </Card>
  );
};

export default MultiChart;
