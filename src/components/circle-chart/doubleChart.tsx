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

const DoubleChart = ({
  name,
  data,
  data2,
  numberfield,
  percentfield,
  labelfield,
  numberfield2,
  percentfield2,
  labelfield2,
  textlabel,
  loading1,
  loading2,
  handleOpenModal,
}: {
  name: string;
  data: any;
  data2: any;
  numberfield: string;
  percentfield: string;
  labelfield: string;
  numberfield2: string;
  percentfield2: string;
  labelfield2: string;
  textlabel: string;
  loading1: boolean;
  loading2: boolean;
  handleOpenModal?: () => void;
}) => {
  //   const [chartData, setChartData] = React.useState();
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

  let percentArray2 = [];
  let numbers2 = [];
  let labelArray2 = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key] as any;
      colorArray.push("#" + getRandomHex());
      percentArray.push(element[percentfield] ? element[percentfield] : 0);
      numbers.push(element[numberfield] ? element[numberfield] : 0);
      labelArray.push(element[labelfield] ? element[labelfield] : "");
    }
  }

  for (const key in data2) {
    if (data2.hasOwnProperty(key)) {
      const element = data2[key] as any;
      colorArray.push("#" + getRandomHex());
      percentArray2.push(element[percentfield2] ? element[percentfield2] : 0);
      numbers2.push(element[numberfield2] ? element[numberfield2] : 0);
      labelArray2.push(element[labelfield2] ? element[labelfield2] : "");
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

  const options2 = {
    dataLabels: { enabled: false },

    labels: labelArray2,
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
          {loading1 && loading2 ? (
            <CircularProgress />
          ) : !data && !data2 ? (
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
            <Box>
              <Box style={{ position: "relative" }}>
                <ReactApexChart
                  type="donut"
                  width={340}
                  options={options}
                  series={percentArray}
                />
              </Box>
              <Box
                style={{
                  position: "absolute",
                  top: "44.5%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <ReactApexChart
                  type="donut"
                  width={240}
                  options={options2}
                  series={percentArray2}
                />
              </Box>
            </Box>
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

export default DoubleChart;
