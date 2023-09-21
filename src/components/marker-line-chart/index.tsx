import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export interface ChartProps {
  title: string;
}

const MarkerLineChart = ({ title }: { title: string }) => {
  const [series, setSeries] = useState([
    {
      name: "Data",
      type: "line",
      data: [100, 120, 150, 170, 180, 170, 160],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    colors: ["#f9994a"],
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
      width: [3],
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
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
    markers: {
      size: 7,
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
            return y.toFixed(2);
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
          height={200}
        />
      </CardContent>
    </Card>
  );
};

export default MarkerLineChart;
