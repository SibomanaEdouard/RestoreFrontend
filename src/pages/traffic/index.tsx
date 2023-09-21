import React from "react";
import axios from "../../utils/axios";
import { Grid, Box } from "@mui/material";
import CircleChart from "../../components/circle-chart";
import DoubleChart from "../../components/circle-chart/doubleChart";
import SelectPeriod from "../../components/select-period";
import TableModal from "../../components/modal/table-modal";
import DoubleTableModal from "../../components/modal/table-modal/doubleTableModal";
import SelectEntries from "../../components/select-entries";
import { periodItems } from "../../components/select-period";
import { entrieNumbers } from "../../components/select-entries";
import TimelogPanel from "../../components/timelogpanel";
import PageContentHeader from "../../components/page-content-header";

const PageTraffic = () => {
  // loading status
  const [destinationLoading, setDestinationDataLoading] = React.useState(false);
  const [sourceIPLoading, setSourceIPLoading] = React.useState(false);
  const [networkBytesLoading, setNetworkBytesLoading] = React.useState(false);
  const [destinationBytesLoading, setDestinationBytesLoading] =
    React.useState(false);
  const [destinationPortLoading, setDestinationPortLoading] =
    React.useState(false);
  const [flowLocalityLoading, setFlowLocalityLoading] = React.useState(false);
  const [networkTransportTypesLoading, setNetworkTransportTypesLoading] =
    React.useState(false);
  const [timeLogLoading, setTimeLogLoading] = React.useState(false);
  // time log
  const [atTime, setAtTime] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState<Date>();
  const [endTime, setEndTime] = React.useState<Date>();

  const [selectedEntrieNumber, setSelectedEntrieNumber] =
    React.useState<string>(entrieNumbers[5]);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(
    periodItems[0]?.value
  );
  const [destinationIpData, setDestinationIpData] = React.useState<any>({});
  const [destinationPortData, setDestinationPortData] = React.useState<any>({});
  const [sourceIPData, setSourceIPData] = React.useState<any>({});
  const [flowLocalityData, setFlowLocalityData] = React.useState<any>({});
  const [networkBytesData, setNetworkBytesData] = React.useState<any>({});
  const [networkTransportTypes, setNetworkTransportTypes] = React.useState<any>(
    {}
  );
  const [destinationBytesData, setDestinationBytesData] = React.useState<any>(
    {}
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
  // Time log bar

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
  const handleOpenDestinationIpOrganisationModal = () => {
    setTitle("Destination IP Organisation");
    setHeads([
      "Destination IP Address",
      "Destination IP Organisation",
      "Percentage of Data (%)",
    ]);
    const result = Object.values(destinationIpData?.data?.mbytes)?.map(
      (item: any) => [item.label, item.org_name, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenDestinationPortModal = () => {
    setTitle("Destination IP");
    setHeads(["Destination Port", "Data (Mb)", "Percentage of Data (%)"]);
    const result = Object.values(destinationPortData?.data?.mbytes).map(
      (item: any) => [item.label, item.source_mbytes, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenSourceIPModal = () => {
    setTitle("Source IP");
    setHeads(["Source IP Address", "Percentage of Data (%)"]);
    const result = Object.values(sourceIPData.data.source_mbytes)?.map(
      (item: any) => [item.label, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenSourceIPCityModal = () => {
    setTitle("Source IP City");
    setHeads(["Source IP Address", "Source IP City", "Percentage of Data (%)"]);
    const result = Object.values(sourceIPData.data.source_mbytes)?.map(
      (item: any) => [item.label, item.city_name, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenSourceIPCountryModal = () => {
    setTitle("Source IP Country");
    setHeads([
      "Source IP Address",
      "Source IP Country",
      "Percentage of Data (%)",
    ]);
    const result = Object.values(sourceIPData?.data?.source_mbytes)?.map(
      (item: any) => [item.label, item.country_name, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenSourceIPOrganizationModal = () => {
    setTitle("Source IP Organization");
    setHeads([
      "Source IP Address",
      "Source IP Organization",
      "Percentage of Data (%)",
    ]);
    const result = Object.values(sourceIPData?.data?.source_mbytes)?.map(
      (item: any) => [item.label, item.org_name, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };
  const handleOpenDestinationBytesModal = () => {
    setTitle("Destination Bytes");
    setHeads([
      "Destination Bytes",
      "Number of Flows",
      "Percentage of Flows (%)",
    ]);
    const result = Object.values(destinationBytesData.data)?.map(
      (item: any) => [item.label, item.count, item.percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenNetworkBytesModal = () => {
    setTitle("Network Bytes");
    setHeads(["Network Bytes", "Number of Flows", "Percentage of Flows (%)"]);
    const result = Object.values(networkBytesData.data)?.map((item: any) => [
      item.label,
      item.count,
      item.percentage,
    ]);
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenFlowLocalityModal = () => {
    setTitle("Flow Locality");
    setHeads(["Flow Locality", "Data (Mb)", "Percentage of Data (%)"]);
    const result = Object.values(flowLocalityData.data.mbytes)?.map(
      (item: any) => [item.label, item.mbytes, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };

  const handleOpenNetworkTransportTypesModal = () => {
    setTitle("Network Transport Types");
    setHeads([
      "Network Transport Types",
      "Data (Mb)",
      "Percentage of Data (%)",
    ]);
    const result = Object.values(networkTransportTypes.data.mbytes)?.map(
      (item: any) => [item.label, item.mbytes, item.mbytes_percentage]
    );
    setBody(result);
    setOpenTableModal(true);
  };
  const handleOpenDestinationDataModal = () => {
    setTitle("Network Transport Data");
    setSubTitle1("Destination IP");
    setSubTitle2("Destination Port");
    setHeads(["Destination IP Address", "Percentage of Data (%)"]);
    setHeads2(["Destination Port", "Data (Mb)", "Percentage of Data (%)"]);
    const result = Object.values(destinationIpData.data.destination_mbytes).map(
      (item: any) => [item.label, item.mbytes_percentage]
    );
    const result2 = Object.values(destinationPortData.data.mbytes).map(
      (item: any) => [item.label, item.source_mbytes, item.mbytes_percentage]
    );
    setBody(result);
    setBody2(result2);
    setOpenDoubleTableModal(true);
  };
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
  const getNetworkBytes = async () => {
    setNetworkBytesLoading(true);
    await axios
      .get(
        `api/chart/netflownts/?window=${parseInt(
          selectedPeriod
        )}&datafield=network_bytes&num_entries=${parseInt(
          selectedEntrieNumber
        )}`
      )
      .then((res) => {
        setNetworkBytesData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setNetworkBytesLoading(false); // Set loading to false after the API request is complete
      });
  };
  const getDestinationBytes = async () => {
    setDestinationBytesLoading(true);
    await axios
      .get(
        `api/chart/netflownts/?window=${parseInt(
          selectedPeriod
        )}&datafield=destination_bytes&num_entries=${parseInt(
          selectedEntrieNumber
        )}`
      )
      .then((res) => {
        setDestinationBytesData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setDestinationBytesLoading(false); // Set loading to false after the API request is complete
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
  const getFlowLocalityData = async () => {
    setFlowLocalityLoading(true);
    await axios
      .get(
        `api/chart/netflownts/?window=${parseInt(
          selectedPeriod
        )}&datafield=flow_locality&num_entries=${parseInt(
          selectedEntrieNumber
        )}`
      )
      .then((res) => {
        setFlowLocalityData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setFlowLocalityLoading(false);
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
  React.useEffect(() => {
    // data fetching
    getData();
    getNetworkBytes();
    getDestinationBytes();
    getSourceIPData();
    getFlowLocalityData();
    getDestinationPortData();
    getNetworkTransportTypeData();
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
        <Box mb={2}>
          <SelectEntries
            selectedEntrieNumber={selectedEntrieNumber}
            setSelectedEntrieNumber={setSelectedEntrieNumber}
          ></SelectEntries>
        </Box>
      </Grid>
      <Grid item md={8} sm={12} xs={12}>
        <Grid item md={12} sm={12} xs={12} id="print-page">
          <PageContentHeader title="Traffic Analysis" />
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Source IP"
              loading={sourceIPLoading}
              data={sourceIPData?.data?.source_mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="label"
              textlabel="Source IP by percentage of data"
              handleOpenModal={handleOpenSourceIPModal}
            />
          </Grid>
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
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Destination IP Organisation"
              loading={destinationLoading}
              data={destinationIpData?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="org_name"
              textlabel="Destination IP Organisation by percentage of data"
              handleOpenModal={handleOpenDestinationIpOrganisationModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Destination Port"
              loading={destinationPortLoading}
              data={destinationPortData?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="label"
              textlabel="Destination Port by percentage of data"
              handleOpenModal={handleOpenDestinationPortModal}
            />
          </Grid>

          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              loading={sourceIPLoading}
              name="Source IP City"
              data={sourceIPData?.data?.source_mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="city_name"
              textlabel="Source IP City by percentage of flow"
              handleOpenModal={handleOpenSourceIPCityModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Source IP Country"
              loading={sourceIPLoading}
              data={sourceIPData?.data?.source_mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="country_name"
              textlabel="Source IP Country by percentage of flow"
              handleOpenModal={handleOpenSourceIPCountryModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Source IP Organization"
              loading={sourceIPLoading}
              data={sourceIPData?.data?.source_mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="org_name"
              textlabel="Source IP Organisation by percentage of flow"
              handleOpenModal={handleOpenSourceIPOrganizationModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Destination Bytes"
              loading={destinationBytesLoading}
              data={destinationBytesData?.data}
              numberfield="mbytes"
              percentfield="percentage"
              labelfield="label"
              textlabel="Destination Bytes by percentage of size of flow"
              handleOpenModal={handleOpenDestinationBytesModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Network Bytes"
              loading={networkBytesLoading}
              data={networkBytesData?.data}
              numberfield="mbytes"
              percentfield="percentage"
              labelfield="label"
              textlabel="Network Bytes by percentage of size of flow"
              handleOpenModal={handleOpenNetworkBytesModal}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <CircleChart
              name="Flow Locality"
              loading={flowLocalityLoading}
              data={flowLocalityData?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="label"
              textlabel="Flow locality by percentage of data"
              handleOpenModal={handleOpenFlowLocalityModal}
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
          <Grid item md={6} sm={6} xs={12} lg={4}>
            <DoubleChart
              name="Destination Data"
              data={destinationIpData?.data?.mbytes}
              numberfield="mbytes"
              percentfield="mbytes_percentage"
              labelfield="label"
              data2={destinationPortData?.data?.mbytes}
              numberfield2="mbytes"
              percentfield2="mbytes_percentage"
              labelfield2="label"
              textlabel="Destination IP Addresses and Ports"
              loading1={destinationLoading}
              loading2={destinationPortLoading}
              handleOpenModal={handleOpenDestinationDataModal}
            />
          </Grid>
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
export default PageTraffic;
