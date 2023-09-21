import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const PageContentHeader = ({ title }: { title: string }) => {
  return (
    <Card sx={{ mb: "1.5rem" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: "1.5rem", textAlign: "center", fontWeight: 700 }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PageContentHeader;
