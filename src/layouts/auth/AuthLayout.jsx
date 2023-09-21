import PropTypes from "prop-types";
// @mui
import { Stack, Box } from "@mui/material";
// components
// import Image from "../../components/image";
//
import {
  StyledRoot,
  // StyledSectionBg,
  // StyledSection,
  StyledContent,
} from "./styles";
import { Outlet } from "react-router-dom";
import LogoFull from "../../components/logo/LogoFull";
import SettingPopover from "../dashboard/header/SettingPopover";

// ----------------------------------------------------------------------

const AuthLayout = ({ children, illustration, title }) => {
  return (
    <>
      <StyledRoot>
        <LogoFull
          sx={{
            zIndex: 9,
            position: "absolute",
            mt: { xs: 1.5, md: 5 },
            ml: { xs: 2, md: 5 },
          }}
        />

        {/* <StyledSection>
          <Typography
            variant="h3"
            sx={{ mb: 10, maxWidth: 480, textAlign: "center" }}
          >
            {title || "Willkommen bei Dentoconect"}
          </Typography>

          <Image
            disabledEffect
            visibleByDefault
            alt="auth"
            src={
              illustration || "/assets/illustrations/illustration_dashboard.png"
            }
            sx={{ maxWidth: 720 }}
          />

          <StyledSectionBg />
        </StyledSection> */}

        <StyledContent>
          <Box
            sx={{
              position: "absolute",
              top: "25%",
              left: "6%",
              display: { xs: "none", sm: "none", lg: "flex" },
            }}
          >
            {/* <Box
              component="img"
              src="/assets/images/tooth/tooth_login.png"
              sx={{ opacity: 0.8, width: { md: 280, lg: 350 } }}
            /> */}
          </Box>
          <Stack sx={{ width: 1 }}>
            <Outlet />
          </Stack>
        </StyledContent>
      </StyledRoot>
      <Box
        sx={{
          position: "absolute",
          right: { xs: 20, sm: 30 },
          top: { xs: 20, sm: 30 },
          animation: "rotate 2s infinite linear",
          "@keyframes rotate": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
        }}
      >
        <SettingPopover></SettingPopover>
      </Box>
    </>
  );
};
AuthLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default AuthLayout;
