import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Link as RouterLink } from "react-router-dom";
import Button from "../components/MUIComponent/Button/Button";
import TextField from "../components/MUIComponent/TextField";
import Link from "../components/MUIComponent/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../components/MUIComponent/TypoText";
import A from "../common/assets"
import ResetPassword from "./ResetPassword";
import SignUp from "./SignUp";

const CustomLink = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink to={href} ref={ref} {...other} />;
});

const SignIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Router>
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
          Welcome Back
        </TypoText>
        <TypoText variant="h5">
          Make a new doc to bring your words, data, and much more. For free.
        </TypoText>

        <TextField required fullWidth id="email" label="Email" name="email" />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
        />

        <Link
          component={CustomLink}
          href="/forgotpassword"
          style={{ textAlign: "right", color: A.colors.link }}
        >
          Forgot password?
        </Link>

        <Button style={{ width: "100%" }}>Sign In</Button>

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
                <Link
                  component={CustomLink}
                  href="/signup"
                  style={{ color: A.colors.link }}
                >
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Switch>
        <Route path="/forgotpassword" component={ResetPassword} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default SignIn;
