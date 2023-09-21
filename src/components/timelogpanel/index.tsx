import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const TimelogPanel = ({
  loading,
  timeLogData,
}: {
  loading: boolean;
  timeLogData: any;
}) => {
  return (
    <Card>
      <CardContent>
        {loading ? (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress></CircularProgress>
          </Box>
        ) : (
          <Box>
            {timeLogData.map(
              (data: { index: string; title: string; logTime: string }) => (
                <Box key={data.index}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "1rem",
                      marginBottom: "2",
                    }}
                  >
                    {data.title}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "0.7rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {`${data.logTime}`}
                  </Typography>
                </Box>
              )
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
export default TimelogPanel;
