import { React } from "react";
import Button from "../components/MUIComponent/Button/Button";
import TextField from "../components/MUIComponent/TextField";
import Link from "../components/MUIComponent/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../components/MUIComponent/TypoText";
import A from "../common/assets";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";

const ResetPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <BrowserRouter>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: "25rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#eaeaea",
          padding: "35px",
        }}
      >
        <TypoText variant="h1" style={{ margin: "0" }}>
          Reset password
        </TypoText>
        <TypoText variant="h5">
          We will send instructions to the email address below to reset your
          password.
        </TypoText>

        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          style={{ marginBottom: "2em" }}
        />
        <Button style={{ width: "100%" }}>Reset Password</Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Grid
              container
              alignItems="center"
              spacing={1}
              justifyContent="center"
            >
              <Grid item>
                <TypoText variant="h5" style={{ textAlign: "center" }}>
                  Don't have an account?
                </TypoText>
              </Grid>
              <Grid item>
                <Link href="/signup" style={{ color: A.colors.link }}>
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Switch>
        <Route path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default ResetPassword;
