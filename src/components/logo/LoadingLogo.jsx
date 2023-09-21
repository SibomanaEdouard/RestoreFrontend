import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, Link } from "@mui/material";

// ----------------------------------------------------------------------

const LoadingLogo = forwardRef(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 64,
          height: 64,
          display: "inline-flex",
          ...sx,
        }}
        {...other}
      >
        <Box component="img" src="/logo/logo_full.png" />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return logo;
  }
);

LoadingLogo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default LoadingLogo;
