import React, { useState, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Button from "../../components/MUIComponent/Button/Button";
import TextField from "../../components/MUIComponent/TextField";
import Link from "../../components/MUIComponent/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../../components/MUIComponent/TypoText";
import A from "../../common/assets";
import { Link as DomLink } from "react-router-dom";
import UserDashBoard from "../User/UserDashboard";

const CustomLink = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <DomLink to={href} ref={ref} {...other} />;
});

const Current = async () => {
  fetch("http://localhost:8080/api/v1/user/current", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
};
const SignIn = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestBody = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        credentials: "include", // Include session cookies
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setErrorMessage("");
        Current();
        setIsAuthenticated(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        passwordRef.current.value = "";
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<UserDashBoard />} />;
      </Routes>
    );
  }

  return (
    <>
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
          inputRef={passwordRef}
        />

        <Link
          component={CustomLink}
          href="/forgotpassword"
          style={{ textAlign: "right", color: A.colors.link }}
        >
          Forgot password?
        </Link>

        <Button style={{ width: "100%" }}>Sign In</Button>
        {errorMessage && (
          <TypoText variant="h4" style={{ color: "red" }}>
            {errorMessage}
          </TypoText>
        )}

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
    </>
  );
};

export default SignIn;
