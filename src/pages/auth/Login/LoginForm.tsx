import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
// form
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  FormControlLabel,
  FormHelperText,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  Box,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// components
//hook

// ----------------------------------------------------------------------
interface IError {
  message?: string;
}
export default function AuthLoginForm() {
  const { apiLogin } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<IError | undefined>();

  const [checked, setChecked] = React.useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting }: any
      ) => {
        setError({ message: "" });
        setIsLoading(true);
        try {
          console.log({ email: values.email, password: values.password });
          await apiLogin({ email: values.email, password: values.password });

          setIsLoading(false);
        } catch (err) {
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
          {error?.message && (
            <Box mb={2.5}>
              <Alert severity="error">{error?.message}</Alert>
            </Box>
          )}
          <Box mb={3}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
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
              label="Password"
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{ mt: 1.5 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link
              variant="body2"
              color="inherit"
              underline="always"
              component={RouterLink}
              to="/auth/forget"
            >
              Forgot password?
            </Link>
          </Stack>
          {/* {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )} */}
          <Stack alignItems="flex-end" sx={{ my: 2 }}></Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Log in
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
}
