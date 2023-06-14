import React, { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/MUIComponent/Button/Button";
import TextField from "../../components/MUIComponent/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../../components/MUIComponent/TypoText";

const ChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  // const history = useNavigate();
  const handleChangePassword = async (event) => {
    event.preventDefault();
    const form = document.getElementById("changePasswordForm");
    const data = new FormData(form);
    const requestBody = {
      oldpass: data.get("oldpass"),
      newpass: data.get("newpass"),
      verpass: data.get("verpass"),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/v1/user/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setErrorMessage("");
        // history.push("/success");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <form
      id="changePasswordForm"
      style={{
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
        Change password
      </TypoText>
      <TypoText variant="h5">
        Change your current password to a more secure one
      </TypoText>
      <Box
        component="form"
        // onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, margin: "0 22px" }}
      >
        <TextField
          // required
          fullWidth
          name="password"
          label="Current password"
          type="password"
          id="oldpass"
        />
        <TextField
          required
          fullWidth
          name="password"
          label="New password"
          type="password"
          id="newpass"
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Confirm new password"
          type="password"
          id="verpass"
          style={{ marginBottom: "2em" }}
        />
        {errorMessage && (
          <TypoText variant="h4" style={{ color: "red" }}>
            {errorMessage}
          </TypoText>
        )}
        <Grid container spacing={2} justifyContent="right">
          <Grid item xs={6} textAlign="right">
            <Button variant="cancel">Cancel</Button>
          </Grid>
          <Grid item xs={6} textAlign="left">
            <Button onClick={handleChangePassword}>Change</Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ChangePassword;
