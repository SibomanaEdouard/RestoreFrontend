import React, { useState } from "react";
import * as Yup from "yup";
// form
import { Formik } from "formik";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  strengthColor,
  strengthIndicator,
} from "../../../utils/passwordStength";
// ----------------------------------------------------------------------
interface levelType {
  label: string;
  color: string;
}
interface IError {
  message?: string;
}
export default function AuthRegisterForm() {
  const { apiRegister } = useAuthContext();
  const [error, setError] = React.useState<IError | undefined>();

  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState<levelType>();
  const googleHandler = async () => {
    console.error("Login");
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    changePassword("");
  }, []);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().min(6).max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setError({ message: "" });
        setIsLoading(true);
        try {
          console.log(values);
          await apiRegister(values);

          setIsLoading(false);
          // @typescript-eslint/no-unused-expressions
        } catch (err: any) {
          setError(err as any);

          setIsLoading(false);
        }
        setIsLoading(false);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            {/* {!!errors?.afterSubmit && (
          <Alert severity="error">{errors?.afterSubmit.message}</Alert>
        )} */}
            {error?.message && (
              <Box mb={2.5}>
                <Alert severity="error">{error?.message}</Alert>
              </Box>
            )}
            <Stack direction={{ xs: "column", sm: "row" }}>
              <Box display={"flex"} flexDirection={{ xs: "column", sm: "row" }}>
                <Box marginRight={{ xs: 0, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    margin="normal"
                    name="firstName"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue=""
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Last Name"
                    margin="normal"
                    name="lastName"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue=""
                  />
                </Box>
              </Box>
            </Stack>

            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
            >
              <InputLabel htmlFor="outlined-adornment-email-register">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                label="Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
            >
              <InputLabel htmlFor="outlined-adornment-password-register">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-register"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ width: 85, height: 8, borderRadius: "7px" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}
            {/* {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )} */}

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Create account
            </LoadingButton>
          </Stack>
        </form>
      )}
    </Formik>
  );
}
