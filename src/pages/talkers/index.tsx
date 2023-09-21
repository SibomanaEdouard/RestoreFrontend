import React from "react";
import {
  Grid,
  Box,
  CardContent,
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@mui/material";
import axios from "../../utils/axios";

import SelectEntries from "../../components/select-entries";
import SelectPeriod from "../../components/select-period";
import SelectNetflowType from "../../components/select-netfolw-type";

import { entrieNumbers } from "../../components/select-entries";
import { periodItems } from "../../components/select-period";
import { netflowTypes } from "../../components/select-netfolw-type";
import PageContentHeader from "../../components/page-content-header";
import TimelogPanel from "../../components/timelogpanel";
import CircularProgress from "@mui/material/CircularProgress";

import { topTalkerData1 } from "../../utils/data";
const PageTalkers = () => {
  //data for top talkers
  const [topTalkerData, setTopTalkerData] = React.useState<any>({});
  // loading status
  const [dataLoading, setDataLoading] = React.useState(false);
  const [timeLogLoading, setTimeLogLoading] = React.useState(false);
  // time log
  const [atTime, setAtTime] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState<Date>();
  const [endTime, setEndTime] = React.useState<Date>();
  const [queryStartTime, setQueryStartTime] = React.useState<Date>();
  const [queryEndTime, setQueryEndTime] = React.useState<Date>();
  // choose entrie number
  const [selectedEntrieNumber, setSelectedEntrieNumber] =
    React.useState<string>(entrieNumbers[5]);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(
    periodItems[0]?.value
  );
  const [selectNetflowType, setSelectNetFlowType] = React.useState<string>(
    netflowTypes[0]
  );
  // table data
  const [tableTitle, setTableTitle] = React.useState<string>("");
  const [heads, setHeads] = React.useState<
    { label: string; sortable: boolean }[]
  >([
    { label: "rank", sortable: true },
    { label: "Source IP", sortable: true },
    { label: "Destination IP", sortable: true },
    { label: "Source Bytes", sortable: true },
    { label: "Destination Bytes", sortable: true },
    { label: "Network Bytes", sortable: true },
    { label: "Source Country", sortable: true },
    { label: "Source City", sortable: true },
    { label: "Source Organization", sortable: true },
    { label: "Destination Country", sortable: true },
    { label: "Destination City", sortable: true },
    { label: "Destination Organization", sortable: true },
    // Add more columns here
  ]);
  const [body, setBody] = React.useState<(string | number)[][]>([]);
  // table sort
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = React.useState<number>(0);
  // get data from backend
  const getTopTalkerData = async () => {
    setDataLoading(true);
    setTimeLogLoading(true);
    setQueryStartTime(new Date());
    await axios
      .get(
        `api/chart/netflowmat/?&window=${parseInt(
          selectedPeriod
        )}&datafield=top_talkers&num_entries=${parseInt(selectedEntrieNumber)}`
      )
      .then((res) => {
        setTopTalkerData(res.data);
        // set Table data by netflow types
        if (selectNetflowType === "Network") {
          setTableTitle("Network Bytes");
          const result = Object.values(res.data.data.top_network_talkers).map(
            (item: any) => [
              item.rank,
              item.source_ip,
              item.destination_ip,
              item.source_bytes,
              item.destination_bytes,
              item.network_bytes,
              item.source_country,
              item.source_city,
              item.source_org,
              item.destination_country,
              item.destination_city,
              item.destination_org,
            ]
          );
          setBody(result);
        } else if (selectNetflowType === "Source") {
          setTableTitle("Source Bytes");
          const result = Object.values(res.data.data.top_network_talkers).map(
            (item: any) => [
              item.rank,
              item.source_ip,
              item.destination_ip,
              item.source_bytes,
              item.destination_bytes,
              item.network_bytes,
              item.source_country,
              item.source_city,
              item.source_org,
              item.destination_country,
              item.destination_city,
              item.destination_org,
            ]
          );
          setBody(result);
        } else if (selectNetflowType === "Destination") {
          setTableTitle("Destination Bytes");
          const result = Object.values(res.data.data.top_network_talkers).map(
            (item: any) => [
              item.rank,
              item.source_ip,
              item.destination_ip,
              item.source_bytes,
              item.destination_bytes,
              item.network_bytes,
              item.source_country,
              item.source_city,
              item.source_org,
              item.destination_country,
              item.destination_city,
              item.destination_org,
            ]
          );
          setBody(result);
        }
        setAtTime(new Date(res.data.query_finish_time));
        setStartTime(new Date(res.data.start_time));
        setEndTime(new Date(res.data.end_time));
        setQueryEndTime(new Date());
      })
      .catch((err) => {})
      .finally(() => {
        setDataLoading(false); // Set loading to false after the API request is complete
        setTimeLogLoading(false);
      });
  };
  React.useEffect(() => {
    getTopTalkerData();
  }, [selectNetflowType, selectedPeriod, selectedEntrieNumber]);

  // console.log(tableData, "asdfsdf");
  const timeLogData = [
    { index: "0", title: "As at:", logTime: atTime },
    { index: "1", title: "Start date & time:", logTime: startTime },
    { index: "2", title: "End date & time:", logTime: endTime },
    { index: "3", title: "Query Start date & time:", logTime: queryStartTime },
    { index: "4", title: "Query End date & time:", logTime: queryEndTime },
  ];
  const handleSort = (column: number) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  const sortedBody = React.useMemo(() => {
    const sortedData = [...body];
    sortedData.sort((a, b) => {
      const cellA = a[sortColumn];
      const cellB = b[sortColumn];
      if (cellA < cellB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (cellA > cellB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  }, [body, sortColumn, sortOrder]);
  // formatting bytes data
  const byteSizes: string[] = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB",
  ];
  const formatBytes = (x: any) => {
    let l = 0,
      n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + byteSizes[l];
  };

  return (
    <Grid container spacing={4}>
      <Grid item md={2} sm={12} xs={12}>
        <Box mb={2}>
          <SelectPeriod
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          ></SelectPeriod>
        </Box>
        <Box mb={2}>
          <SelectEntries
            selectedEntrieNumber={selectedEntrieNumber}
            setSelectedEntrieNumber={setSelectedEntrieNumber}
          ></SelectEntries>
        </Box>
        <Box>
          <SelectNetflowType
            selectNetflowType={selectNetflowType}
            setSelectNetFlowType={setSelectNetFlowType}
          ></SelectNetflowType>
        </Box>
      </Grid>
      <Grid item md={8} sm={12} xs={12} id="print-page">
        <PageContentHeader title="Netflow Data - Top Talkers" />
        <Card>
          <CardContent>
            {dataLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Typography sx={{ textAlign: "center", fontSize: "1.2rem" }}>
                  {tableTitle}
                </Typography>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {heads?.map((head, index) => (
                        <TableCell
                          key={`head-${index}`}
                          sx={{
                            textAlign: "center",
                            border: "solid 1px #e2e2e2",
                            fontSize: "0.6rem",
                            padding: "1px !important",
                          }}
                        >
                          {head.sortable ? (
                            <TableSortLabel
                              active={sortColumn === index}
                              direction={sortOrder}
                              onClick={() => handleSort(index)}
                              hideSortIcon
                            >
                              {head.label}
                            </TableSortLabel>
                          ) : (
                            head.label
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedBody?.map((row, index) => (
                      <TableRow key={`body-${index}`}>
                        {row?.map((cell, index) => (
                          <TableCell
                            key={`cell-${index}`}
                            sx={{
                              textAlign: "center",
                              border: "solid 1px #e2e2e2",
                              fontSize: "0.65rem",
                              padding: "1px !important",
                            }}
                          >
                            {index > 1 && typeof cell === "number"
                              ? formatBytes(cell)
                              : cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={2} sm={12} xs={12}>
        <TimelogPanel loading={timeLogLoading} timeLogData={timeLogData} />
      </Grid>
    </Grid>
  );
};
export default PageTalkers;
