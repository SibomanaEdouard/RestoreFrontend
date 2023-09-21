import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Grid, Box } from "@mui/material";
import SelectEntries from "../../components/select-entries";
import SelectPeriod from "../../components/select-period";
import { entrieNumbers } from "../../components/select-entries";
import { periodItems } from "../../components/select-period";
import PageContentHeader from "../../components/page-content-header";
import CircleChart from "../../components/circle-chart";
import DoubleChart from "../../components/circle-chart/doubleChart";
import TableModal from "../../components/modal/table-modal";
import DataTable from "../../components/data-table";
import DoubleTableModal from "../../components/modal/table-modal/doubleTableModal";
import TimelogPanel from "../../components/timelogpanel";
// import { sourceIpData } from "../../utils/data";

const PageConversation = () => {
  // chart and table data
  const [destinationIpData, setDestinationIpData] = React.useState<any>({});
  const [sourceIPData, setSourceIPData] = React.useState<any>({});
  const [networkTransportTypes, setNetworkTransportTypes] = React.useState<any>(
    {}
  );
  const [destinationPortData, setDestinationPortData] = React.useState<any>({});
  const [sourcePortData, setSourcePortData] = React.useState<any>({});
  // loading status
  const [destinationLoading, setDestinationDataLoading] = React.useState(false);
  const [destinationPortLoading, setDestinationPortLoading] =
    React.useState(false);
  const [sourceIPLoading, setSourceIPLoading] = React.useState(false);
  const [networkTransportTypesLoading, setNetworkTransportTypesLoading] =
    React.useState(false);
  const [sourcePortLoading, setSourcePortLoading] = React.useState(false);
  const [timeLogLoading, setTimeLogLoading] = React.useState(false);

  // time log
  const [atTime, setAtTime] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState<Date>();
  const [endTime, setEndTime] = React.useState<Date>();
  // choose time and number of entries
  const [selectedEntrieNumber, setSelectedEntrieNumber] =
    React.useState<string>(entrieNumbers[5]);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(
    periodItems[0]?.value
  );
  const [openTableModal, setOpenTableModal] = React.useState(false);
  const [openDoubleTableModal, setOpenDoubleTableModal] = React.useState(false);
  const [title, setTitle] = React.useState<string>("");
  const [subTitle1, setSubTitle1] = React.useState<string>("");
  const [subTitle2, setSubTitle2] = React.useState<string>("");
  const [heads, setHeads] = React.useState<string[]>([]);
  const [body, setBody] = React.useState<(string | number)[][]>([]);
  // double table modal data
  const [heads2, setHeads2] = React.useState<string[]>([]);
  const [body2, setBody2] = React.useState<(string | number)[][]>([]);
  // data table
  const [dataTableHead, setDataTableHead] = useState<string[]>([]);
  const [dataTableTitle, setDataTableTitle] = useState<string>("");
  const [dataTableBody, setDataTableBody] = React.useState<
    (string | number)[][]
  >([]);

  const handleOpenIPAddressModal = () => {
    setTitle("IP Addresses");
    setSubTitle1("Destination IP");
    setSubTitle2("Source IP");
    setHeads(["Destination IP Address", "Percentage of Data (%)"]);
    setHeads2(["Source IP Address", "Percentage of Data (%)"]);
    const result = Object.values(destinationIpData.data.destination_mbytes).map(
      (item: any) => [item.label, item.mbytes_percentage]
    );
    const result2 = Object.values(sourceIPData.data.mbytes).map((item: any) => [
      item.label,
      item.mbytes_percentage,
    ]);
    setBody(result);
    setBody2(result2);
    setOpenDoubleTableModal(true);
  };

  const handleOpenDataPortsModal = () => {
    setTitle("Ports Data");
    setSubTitle1("Destination Port");
    setSubTitle2("Source Port");
    setHeads(["Destination Port", "Data (Mb)", "Percentage of Data (%)"]);
    setHeads2(["Source IP Address", "Percentage of Data (%)"]);
    const result = Object.values(destinationPortData.data.mbytes).map(
      (item: any) => [item.label, item.source_mbytes, item.mbytes_percentage]
    );
    const result2 = Object.values(sourceIPData.data.mbytes).map((item: any) => [
      item.label,
      item.mbytes_percentage,
    ]);
    setBody(result);
    setBody2(result2);
    setOpenDoubleTableModal(true);
  };

  const handleOpenNetworkTransportTypesModal = () => {
    setTitle("Network Transport Types");
    setHeads([
      "Network Transport Types",
      "Data (Mb)",
      "Percentage of Data (%)",
    ]);
    const result = Object.values(networkTransportTypes.data.mbytes).map(
      (item: any) => [item.label, item.mbytes, item.mbytes_percentage]
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
  const getSourceIPData = async () => {
    setSourceIPLoading(true);
    await axios
      .get(
        `api/chart/netflownts/?window=${parseInt(
          selectedPeriod
        )}&datafield=source_ip&num_entries=${parseInt(selectedEntrieNumber)}`
      )
      .then((res) => {
        setSourceIPData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setSourceIPLoading(false); // Set loading to false after the API request is complete
      });
  };
  const getSourcePortData = async () => {
    setSourcePortLoading(true);
    await axios
      .get(
        `api/chart/netflownts/?window=${parseInt(
          selectedPeriod
        )}&datafield=source_port&num_entries=${parseInt(selectedEntrieNumber)}`
      )
      .then((res) => {
        setSourcePortData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setSourcePortLoading(false); // Set loading to false after the API request is complete
      });
  };
  const getNetworkTransportTypeData = async () => {
    setNetworkTransportTypesLoading(true);
    await axios
      .get(
        `api/chart/netflownts/?window=${parseInt(
          selectedPeriod
        )}&datafield=network_transport&num_entries=${parseInt(
          selectedEntrieNumber
        )}`
      )
      .then((res) => {
        setNetworkTransportTypes(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setNetworkTransportTypesLoading(false);
      });
  };
  useEffect(() => {
    getData();
    getDestinationPortData();
    getSourcePortData();
    getSourceIPData();
    getNetworkTransportTypeData();
    // table data
    setDataTableTitle("Top Cities");
    setDataTableHead(["Source", "Destination", "Bytes", "Flow Records"]);
    const result = [["192.168.255.31", "151.101.113.190", "6G", "60"]];
    setDataTableBody(result);
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
        <Grid item md={12} sm={12} xs={12}>
          <PageContentHeader title="Conversation Peers" />
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <DoubleChart
              name="IP Addresses"
              data={destinationIpData?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="label"
              data2={sourceIPData?.data?.source_mbytes}
              numberfield2="mbytes"
              percentfield2="mbytes_percentage"
              labelfield2="label"
              textlabel="Destination & Source IP Addresses"
              loading1={destinationLoading}
              loading2={sourceIPLoading}
              handleOpenModal={handleOpenIPAddressModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <DoubleChart
              name="Ports Data"
              data={destinationPortData?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="label"
              data2={sourceIPData?.data?.mbytes}
              numberfield2="mbytes"
              percentfield2="mbytes_percentage"
              labelfield2="label"
              textlabel="Destination & Source IP Addresses"
              loading1={destinationPortLoading}
              loading2={sourceIPLoading}
              handleOpenModal={handleOpenDataPortsModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Network Transport Types"
              loading={networkTransportTypesLoading}
              data={networkTransportTypes?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="label"
              textlabel="Network Transport Types by percentage of data"
              handleOpenModal={handleOpenNetworkTransportTypesModal}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <DataTable
              title={dataTableTitle}
              heads={dataTableHead}
              body={dataTableBody}
            ></DataTable>
          </Grid>
        </Grid>
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
      <DoubleTableModal
        openDoubleTableModal={openDoubleTableModal}
        setOpenDoubleTableModal={setOpenDoubleTableModal}
        title={title}
        subtitle1={subTitle1}
        subtitle2={subTitle2}
        heads={heads}
        body={body}
        heads2={heads2}
        body2={body2}
      ></DoubleTableModal>
    </Grid>
  );
};
export default PageConversation;
