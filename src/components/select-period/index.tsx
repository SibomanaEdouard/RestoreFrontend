import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { IPeriod } from "../../interfaces/interface";
export const periodItems = [
  { title: "3 Hours", value: "3" },
  { title: "4 Hours", value: "4" },
  { title: "5 Hours", value: "5" },
  { title: "6 Hours", value: "6" },
  { title: "12 Hours", value: "12" },
  { title: "2 Days", value: "48" },
  { title: "3 Days", value: "72" },
  { title: "4 Days", value: "96" },
  { title: "5 Days", value: "120" },
  { title: "6 Days", value: "144" },
  { title: "7 Days", value: "168" },
  { title: "8 Days", value: "192" },
  { title: "9 Days", value: "216" },
  { title: "10 Days", value: "240" },
  { title: "15 Days", value: "360" },
  { title: "20 Days", value: "480" },
  { title: "25 Days", value: "600" },
  { title: "30 Days", value: "720" },
] as IPeriod[];

const SelectPeriod = ({ selectedPeriod, setSelectedPeriod }: any) => {
  const handleChange = (event: { target: { value: string } }) => {
    setSelectedPeriod(event.target.value);
  };
  React.useEffect(() => {
    setSelectedPeriod(periodItems[0]?.value);
  }, []);
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: "0.8rem", mb: "0.5rem" }}>
          Select a lookback time period:
        </Typography>
        <Select value={selectedPeriod} onChange={handleChange} fullWidth>
          {periodItems?.map((hour: IPeriod) => (
            <MenuItem value={hour?.value} key={hour?.value}>
              {hour?.title}
            </MenuItem>
          ))}
        </Select>
      </CardContent>
    </Card>
  );
};

export default SelectPeriod;
