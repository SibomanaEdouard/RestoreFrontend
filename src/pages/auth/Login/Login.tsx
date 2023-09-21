import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Stack, Typography, Link } from "@mui/material";
import AuthLoginForm from "./LoginForm";
// import AuthWithSocial from "../AuthWIthSocial";
// import { GoogleLogin } from "@react-oauth/google";

// const auth0 = await createAuth0Client({
//   domain: "<AUTH0_DOMAIN>",
//   clientId: "<AUTH0_CLIENT_ID>",
//   authorizationParams: {
//     redirect_uri: "<MY_CALLBACK_URL>",
//   },
// });
const Page_Login = () => {
  return (
    <>
      <Helmet>
        <title> Login | Racksnet</title>
      </Helmet>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Log in to Racksnet</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link variant="subtitle2" to="/auth/register" component={RouterLink}>
            Create an account
          </Link>
        </Stack>
      </Stack>
      <AuthLoginForm />
      {/* <AuthWithSocial title={"Continue with Google"} /> */}
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */}
    </>
  );
};

export default Page_Login;
