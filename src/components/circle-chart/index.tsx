import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import { ReactComponent as Icon } from "../../assets/svg/illustration_empty_content.svg";
import CircularProgress from "@mui/material/CircularProgress";
export interface IDataSets {
  labels: string[];
  data: number[];
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  hoverOffset?: number;
}
export interface IChartData {
  labels: string[];
  datasets: IDataSets[];
}

const CircleChart = ({
  name,
  data,
  numberfield,
  percentfield,
  labelfield,
  textlabel,
  loading,
  handleOpenModal,
}: {
  name: string;
  loading: boolean;
  data: any;
  numberfield: string;
  percentfield: string;
  labelfield: string;
  textlabel: string;
  handleOpenModal?: () => void;
}) => {
  function getRandomHex() {
    var hex = Math.floor(Math.random() * 0xffffff).toString(16);
    while (hex.length < 6) {
      hex = "0" + hex;
    }
    return hex;
  }
  let percentArray = [];
  let numbers = [];
  let labelArray = [];
  let colorArray = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key] as any;
      colorArray.push("#" + getRandomHex());
      percentArray.push(element[percentfield] ? element[percentfield] : 0);
      numbers.push(element[numberfield] ? element[numberfield] : 0);
      labelArray.push(element[labelfield] ? element[labelfield] : "");
    }
  }

  const options = {
    dataLabels: { enabled: false },

    labels: labelArray,
    colors: colorArray,
    legend: {
      show: false,
    },
    stroke: {
      colors: ["#212B36"],
      width: 1,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ textAlign: "center", fontSize: "1.2rem" }}>
          {name}
        </Typography>
        <Box display={"flex"} justifyContent={"center"}>
          {loading ? (
            <CircularProgress />
          ) : !data ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Icon width="100%" height="100%" />
            </Box>
          ) : (
            <ReactApexChart
              type="donut"
              width={340}
              options={options}
              series={percentArray}
            />
          )}
        </Box>
        <Typography sx={{ textAlign: "center", fontSize: "0.8rem" }}>
          {textlabel}
        </Typography>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            startIcon={<SmartDisplayOutlinedIcon />}
            onClick={handleOpenModal}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CircleChart;
