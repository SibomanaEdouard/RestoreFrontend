import { Link as RouterLink } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { Stack, Typography, Link } from "@mui/material";
// import AuthWithSocial from "../AuthWIthSocial";
import { PATH_AUTH } from "../../../routes/paths";
import AuthRegisterForm from "./RegisterForm";

const Page_Register = () => {
  return (
    <>
      <Helmet>
        <title> Sign up | RacksNet</title>
      </Helmet>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get started absolutely free.</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link component={RouterLink} to={PATH_AUTH.login} variant="subtitle2">
            Log in
          </Link>
        </Stack>
      </Stack>
      <AuthRegisterForm />
      {/* <AuthWithSocial title={"Sign Up with Google"} /> */}
      <Typography
        component="div"
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By signing up, I agree to "}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {" and "}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography>
    </>
  );
};

export default Page_Register;
