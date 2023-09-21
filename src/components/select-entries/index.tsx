import React from "react";
import {
  Paper,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";

export const entrieNumbers = ["5", "10", "15", "20", "25", "30"] as string[];

const SelectEntries = ({
  selectedEntrieNumber,
  setSelectedEntrieNumber,
}: any) => {
  React.useEffect(() => {
    entrieNumbers[5] && setSelectedEntrieNumber(entrieNumbers[5]);
  }, []);

  const handleChange = (event: { target: { value: string } }) => {
    setSelectedEntrieNumber(event.target.value);
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: "0.8rem", mb: "0.5rem" }}>
          Select number of entries:
        </Typography>
        <Select value={selectedEntrieNumber} onChange={handleChange} fullWidth>
          {entrieNumbers?.map((entrie: string) => (
            <MenuItem value={entrie} key={entrie}>
              {entrie}
            </MenuItem>
          ))}
        </Select>
      </CardContent>
    </Card>
  );
};
export default SelectEntries;
