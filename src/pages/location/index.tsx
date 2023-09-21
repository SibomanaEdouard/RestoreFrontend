import React from "react";
import axios from "../../utils/axios";
import { Grid, Box } from "@mui/material";
import SelectEntries from "../../components/select-entries";
import SelectPeriod from "../../components/select-period";
import { entrieNumbers } from "../../components/select-entries";
import { periodItems } from "../../components/select-period";
import PageContentHeader from "../../components/page-content-header";
import GoogleMapCard from "../../components/google-map";
import CircleChart from "../../components/circle-chart";
import TableModal from "../../components/modal/table-modal";
import TimelogPanel from "../../components/timelogpanel";

const PageLocation = () => {
  // chart data
  const [destinationIpData, setDestinationIpData] = React.useState<any>({});
  const [destinationPortData, setDestinationPortData] = React.useState<any>({});
  // loading status
  const [destinationLoading, setDestinationDataLoading] = React.useState(false);
  const [timeLogLoading, setTimeLogLoading] = React.useState(false);
  const [destinationPortLoading, setDestinationPortLoading] =
    React.useState(false);
  const [openTableModal, setOpenTableModal] = React.useState(false);
  // table modal
  const [title, setTitle] = React.useState<string>("");
  const [heads, setHeads] = React.useState<string[]>([]);
  const [body, setBody] = React.useState<(string | number)[][]>([]);

  const [selectedEntrieNumber, setSelectedEntrieNumber] =
    React.useState<string>(entrieNumbers[5]);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(
    periodItems[0]?.value
  );
  // time log
  const [atTime, setAtTime] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState<Date>();
  const [endTime, setEndTime] = React.useState<Date>();
  const handleOpenDestinationIpModal = () => {
    setTitle("Destination IP");
    setHeads(["Destination IP Address", "Percentage of Data (%)"]);
    const result = Object.values(destinationIpData?.data?.mbytes)?.map(
      (item: any) => [item.label, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenDestinationIpCityModal = () => {
    setTitle("Destination IP City");
    setHeads([
      "Destination IP Address",
      "Destination IP City",
      "Percentage of Data (%)",
    ]);
    const result = Object.values(destinationIpData?.data?.mbytes)?.map(
      (item: any) => [item.label, item.city_name, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenDestinationIpCountryModal = () => {
    setTitle("Destination IP Cpuntry");
    setHeads([
      "Destination IP Address",
      "Destination IP Country",
      "Percentage of Data (%)",
    ]);
    const result = Object.values(destinationIpData?.data?.mbytes)?.map(
      (item: any) => [item.label, item.country_name, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };
  // axios functions to get data from db
  const getData = async () => {
    setDestinationDataLoading(true);
    await axios
      .get(
        `api/chart/netflownts/?&window=${parseInt(
          selectedPeriod
        )}&datafield=destination_ip&num_entries=${parseInt(
          selectedEntrieNumber
        )}`
      )
      .then((res) => {
        setDestinationIpData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setDestinationDataLoading(false); // Set loading to false after the API request is complete
      });
  };
  React.useEffect(() => {
    // data fetching
    getData();
    getDestinationPortData();
  }, [selectedPeriod, selectedEntrieNumber]);
  const getDestinationPortData = async () => {
    setDestinationPortLoading(true);
    setTimeLogLoading(true);
    await axios
      .get(
        `api/chart/netflownts/?&window=${parseInt(
          selectedPeriod
        )}&datafield=destination_port&num_entries=${parseInt(
          selectedEntrieNumber
        )}`
      )
      .then((res) => {
        setDestinationPortData(res.data);
        setAtTime(new Date(res.data.query_finish_time));
        setStartTime(new Date(res.data.start_time));
        setEndTime(new Date(res.data.end_time));
      })
      .catch((err) => {})
      .finally(() => {
        setDestinationPortLoading(false); // Set loading to false after the API request is complete
        setTimeLogLoading(false);
      });
  };
  const timeLogData = [
    { index: "0", title: "As at:", logTime: atTime },
    { index: "1", title: "Start date & time:", logTime: startTime },
    { index: "2", title: "End date & time:", logTime: endTime },
  ];
  return (
    <Grid container spacing={4}>
      <Grid item md={2} sm={12} xs={12}>
        <Box mb={2}>
          <SelectPeriod
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          ></SelectPeriod>
        </Box>
        <SelectEntries
          selectedEntrieNumber={selectedEntrieNumber}
          setSelectedEntrieNumber={setSelectedEntrieNumber}
        ></SelectEntries>
      </Grid>
      <Grid item md={8} sm={12} xs={12} id="print-page">
        <PageContentHeader title="Geo Location" />
        <Grid container spacing={4}>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Destination IP"
              loading={destinationLoading}
              data={destinationIpData?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="label"
              textlabel="Destination IP by percentage of data"
              handleOpenModal={handleOpenDestinationIpModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Destination IP City"
              loading={destinationLoading}
              data={destinationIpData?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="city_name"
              textlabel="Destination IP City by percentage of data"
              handleOpenModal={handleOpenDestinationIpCityModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Destination IP Country"
              loading={destinationLoading}
              data={destinationIpData?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="country_name"
              textlabel="Destination IP Country by percentage of data"
              handleOpenModal={handleOpenDestinationIpCountryModal}
            />
          </Grid>
        </Grid>
        <GoogleMapCard></GoogleMapCard>
      </Grid>
      <Grid item md={2} sm={12} xs={12}>
        <TimelogPanel loading={timeLogLoading} timeLogData={timeLogData} />
      </Grid>
      <TableModal
        openTableModal={openTableModal}
        setOpenTableModal={setOpenTableModal}
        title={title}
        heads={heads}
        body={body}
      ></TableModal>
    </Grid>
  );
};
export default PageLocation;
