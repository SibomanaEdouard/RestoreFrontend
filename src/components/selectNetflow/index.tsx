import React from "react";
import { Paper, Typography, Select, MenuItem, Card, CardContent, } from "@mui/material";

export const netFlowTypes = ["Source", "Destination", "Netwok"] as string[];

const SelectEntries = ({
    selectedNetflowType,
    setSelectedNetflowType,
}: any) => {

    React.useEffect(() => {
        netFlowTypes[0] && setSelectedNetflowType(netFlowTypes[0]);
    }, []);

    const handleChange = (event: { target: { value: string } }) => {
        setSelectedNetflowType(event.target.value);
    };

    return (
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: "0.8rem", mb: "0.5rem" }}>Select number of entries:</Typography>
                <Select value={selectedNetflowType} onChange={handleChange} fullWidth>
                    {netFlowTypes?.map((entrie: string) => (
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
