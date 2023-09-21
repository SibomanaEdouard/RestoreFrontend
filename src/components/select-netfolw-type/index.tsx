import React from "react";
import { Typography, Select, MenuItem, Card, CardContent } from "@mui/material";

export const netflowTypes = ["Network", "Source", "Destination"] as string[];

const SelectNetflowType = ({
  selectNetflowType,
  setSelectNetFlowType,
}: any) => {
  React.useEffect(() => {
    netflowTypes[5] && setSelectNetFlowType(netflowTypes[2]);
  }, []);

  const handleChange = (event: { target: { value: string } }) => {
    setSelectNetFlowType(event.target.value);
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: "0.8rem", mb: "0.5rem" }}>
          Select netflow type:
        </Typography>
        <Select value={selectNetflowType} onChange={handleChange} fullWidth>
          {netflowTypes?.map((entrie: string) => (
            <MenuItem value={entrie} key={entrie}>
              {entrie}
            </MenuItem>
          ))}
        </Select>
      </CardContent>
    </Card>
  );
};
export default SelectNetflowType;
