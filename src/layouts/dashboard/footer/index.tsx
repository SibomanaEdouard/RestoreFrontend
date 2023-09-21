import { Box } from "@mui/material";
import React from "react";

const PageFooter = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100%",
        height: 40,
        position: "fixed",
        bottom: 0,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
        }}
      >
        Copyright &copy;{year} Racksnet GmbH
      </Box>
    </Box>
  );
};
export default PageFooter;
