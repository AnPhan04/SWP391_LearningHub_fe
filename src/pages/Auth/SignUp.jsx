import React, { useState } from "react";
import Button from "../../components/MUIComponent/Button/Button";
import TextField from "../../components/MUIComponent/TextField";
import Link from "../../components/MUIComponent/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../../components/MUIComponent/TypoText";
import A from "../../common/assets";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const currentDate = new Date();
    const requestBody = {
      email: data.get("email"),
      realName: data.get("name"),
      phoneNum: data.get("phone"),
      password: data.get("password"),
      roleId: "",
      isActive: "",
      signupDate: "2023-06-04",
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
        // setErrorMessage("Create new account successfully");
        navigate("/login");
      } else {
        setErrorMessage(responseData.message);
      }
    } catch (error) {}
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
        <TypoText variant="h1" style={{ margin: "0" }}>
          Welcome Back
        </TypoText>
        <TypoText variant="h5">
          Make a new doc to bring your words, data, and much more. For free.
        </TypoText>

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          style={{ marginTop: 0, marginBottom: 0 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="name"
          label="Name"
          type="text"
          id="name"
          style={{ marginTop: 0, marginBottom: 0 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Phone Number"
          type="text"
          id="phone"
          style={{ marginTop: 0, marginBottom: 0 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          style={{ marginTop: 0, marginBottom: 0 }}
        />
        <Button style={{ width: "100%" }}>Sign Up</Button>
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
                  Already have an account?
                </TypoText>
              </Grid>
              <Grid item>
                <Link href="/login" style={{ color: A.colors.link }}>
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      // <Routes>
      //   <Route path="/login" component={SignIn}></Route>
      // </Routes>
  );
};
export default SignUp;
