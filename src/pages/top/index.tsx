import React from "react";
import axios from "../../utils/axios";
import { Grid, Box } from "@mui/material";
import TimelogPanel from "../../components/timelogpanel";
import SelectEntries from "../../components/select-entries";
import SelectPeriod from "../../components/select-period";
import { entrieNumbers } from "../../components/select-entries";
import { periodItems } from "../../components/select-period";
import PageContentHeader from "../../components/page-content-header";
import DataTable from "../../components/data-table";

const PageTop = () => {
  // data
  const [destinationPortData, setDestinationPortData] = React.useState<any>({});
  // loading status
  const [destinationPortLoading, setDestinationPortLoading] =
    React.useState(false);
  const [timeLogLoading, setTimeLogLoading] = React.useState(false);

  // choose entrie
  const [selectedEntrieNumber, setSelectedEntrieNumber] =
    React.useState<string>(periodItems[0]?.value);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(
    entrieNumbers[0]
  );
  // time log
  const [atTime, setAtTime] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState<Date>();
  const [endTime, setEndTime] = React.useState<Date>();
  // data table
  const [topSourceTableBody, setTopSourceTableBody] = React.useState<
    (string | number)[][]
  >([]);
  const [topDestinationsTableBody, setTopDestinationsTableBody] =
    React.useState<(string | number)[][]>([]);
  const [topSourcePortsTableBody, setTopSourcePortsTableBody] = React.useState<
    (string | number)[][]
  >([]);
  const [topDestinationPortTableBody, setTopDestinationPortTableBody] =
    React.useState<(string | number)[][]>([]);
  const [topProtocolTableBody, setTopProtocolTableBody] = React.useState<
    (string | number)[][]
  >([]);
  const [topAutonomousTableBody, setTopAutonomousTableBody] = React.useState<
    (string | number)[][]
  >([]);
  const [topCitiesTableBody, setTopCitiesTableBody] = React.useState<
    (string | number)[][]
  >([]);
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
  React.useEffect(() => {
    getDestinationPortData();
    // const result = [["192.168.255.31", "17.3GB", "236094"]];
    setTopSourceTableBody([["192.168.255.31", "17.3GB", "236094"]]);
    setTopDestinationsTableBody([["217.92.51.61", "103.1GB", "36281"]]);
    setTopSourcePortsTableBody([["443", "88GB", "11984"]]);
    setTopDestinationPortTableBody([["443", "21.1GB", "273130"]]);
    setTopProtocolTableBody([["tcp", "108.7GB", "541963"]]);
    setTopAutonomousTableBody([["Deutsche Telekom AG", "103.1GB", "42785"]]);
    setTopCitiesTableBody([["Germany", "Essen", "103.1GB", "36281"]]);
  }, [selectedPeriod, selectedEntrieNumber]);
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
        <PageContentHeader title="Top N" />
        <Grid container spacing={4}>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <DataTable
              title="Top Sources"
              heads={["Source", "Bytes", "Flow Records"]}
              body={topSourceTableBody}
            ></DataTable>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <DataTable
              title="Top Destinations"
              heads={["Destination", "Bytes", "Flow Records"]}
              body={topDestinationsTableBody}
            ></DataTable>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <DataTable
              title="Top Source Ports"
              heads={["Source", "Bytes", "Flow Records"]}
              body={topSourcePortsTableBody}
            ></DataTable>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <DataTable
              title="Top Destination Ports"
              heads={["Destination", "Bytes", "Flow Records"]}
              body={topDestinationPortTableBody}
            ></DataTable>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <DataTable
              title="Top Protocols"
              heads={["Protocol", "Bytes", "Flow Records"]}
              body={topProtocolTableBody}
            ></DataTable>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <DataTable
              title="Top Autonomous Systems"
              heads={["Autonomous Systems", "Bytes", "Flow Records"]}
              body={topAutonomousTableBody}
            ></DataTable>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <DataTable
              title="Top Cities"
              heads={["Country", "City", "Bytes", "Flow Records"]}
              body={topCitiesTableBody}
            ></DataTable>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={12}></Grid>
          <Grid item md={12} sm={12} xs={12} lg={12}></Grid>
        </Grid>
      </Grid>
      <Grid item md={2} sm={12} xs={12}>
        <TimelogPanel loading={timeLogLoading} timeLogData={timeLogData} />
      </Grid>
    </Grid>
  );
};
export default PageTop;
