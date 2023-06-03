import { React } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/MUIComponent/Button/Button";
import TextField from "../components/MUIComponent/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../components/MUIComponent/TypoText";
import A from "../common/assets";
const EditProfile = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const history = useHistory();

  const handleCancel = (event) => {
    event.preventDefault();
    history.replace("/accountsetting");
    // history.push("/accountsetting");
  };

  return (
    <form
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
        Edit Profile
      </TypoText>
      <TypoText variant="h5">Change anything you want except email</TypoText>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, margin: "0 22px" }}
      >
        <label style={{ color: A.colors.disabled }}>
          <TypoText
            variant="h5"
            style={{
              textAlign: "left",
              marginBlock: "2em 0",
            }}
          >
            Email
            <TextField
              disabled
              fullWidth
              value="Your email"
              name="email"
              type="text"
              id="email"
            />
          </TypoText>
        </label>
        <label>
          <TypoText
            variant="h5"
            style={{
              textAlign: "left",
              marginBlock: "0.5em 0",
            }}
          >
            Full Name
            <TextField
              required
              fullWidth
              name="name"
              value="Your name"
              type="text"
              id="name"
            />
          </TypoText>
        </label>
        <label>
          <TypoText
            variant="h5"
            style={{
              textAlign: "left",
              marginBlock: "0.5em 0",
            }}
          >
            Phone Number
            <TextField
              required
              fullWidth
              name="phone"
              value="0123456789"
              type="text"
              id="phone"
              style={{ marginBottom: "2em" }}
            />
          </TypoText>
        </label>

        <Grid container spacing={2} justifyContent="right">
          <Grid item xs={6} textAlign="right">
            <Button variant="cancel" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="left">
            <Button>Change</Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default EditProfile;