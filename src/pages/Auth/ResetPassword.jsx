import React, { useState } from "react";
import Button from "../../components/MUIComponent/Button/Button";
import TextField from "../../components/MUIComponent/TextField";
import Link from "../../components/MUIComponent/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../../components/MUIComponent/TypoText";
import A from "../../common/assets";
import { CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";

const loadingStyle = {
  "margin": "10px auto",
  "display": "flex",
  "justify-content": "center",
}

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const requestParam = {
      email: data.get("email"),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/user/password?email=${requestParam.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestParam),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setErrorMessage("Please check your email to get a new password");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
    setIsLoading(false);
  };

  return (
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
      <TypoText variant="h1" style={{ margin: "1vh 0" }}>
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
        style={{ marginBottom: "1em" }}
      />
      {!isLoading && <Button style={{ width: "100%" }}>Reset Password</Button>}
      {isLoading && <div style={loadingStyle}><CircularProgress /></div>}
      {errorMessage && (
        <TypoText variant="h4" color={A.colors.red}>
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
              <TypoText variant="h5" style={{ textAlign: "center",margin:0 }}>
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
  );
};

export default ResetPassword;
