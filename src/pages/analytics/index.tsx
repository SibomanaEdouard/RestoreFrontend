import React from "react";
import { Grid, Box } from "@mui/material";

import SelectEntries from "../../components/select-entries";
import SelectPeriod from "../../components/select-period";

import { entrieNumbers } from "../../components/select-entries";
import { periodItems } from "../../components/select-period";
import PageContentHeader from "../../components/page-content-header";
import MultiChart from "../../components/multi-line-chart";
const PageAnalytics = () => {
  const [selectedEntrieNumber, setSelectedEntrieNumber] =
    React.useState<string>(periodItems[0]?.value);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(
    entrieNumbers[0]
  );
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
        <PageContentHeader title="Predictive Analytics" />
        <Grid container spacing={4}>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <MultiChart title="Daily Traffic Patterns for last 4 weeks"></MultiChart>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={2} sm={12} xs={12}>
        AA
      </Grid>
    </Grid>
  );
};
export default PageAnalytics;
