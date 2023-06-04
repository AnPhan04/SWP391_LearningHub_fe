import {React} from "react";
import Button from "../components/MUIComponent/Button/Button";
import TextField from "../components/MUIComponent/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../components/MUIComponent/TypoText";


const ChangePassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
        Change password
      </TypoText>
      <TypoText variant="h5">
        Change your current password to a more secure one
      </TypoText>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, margin: "0 22px" }}
      >
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          style={{ marginBottom: "2em" }}
        />
        {/* <Link href="#" style={{ textAlign: "right", color: A.colors.link }}>
          Forgot password?
        </Link> */}
        <Grid container spacing={2} justifyContent="right">
          <Grid item xs={6} textAlign="right">
            <Button variant="cancel">Cancel</Button>
            {/* <Button>Change</Button> */}
          </Grid>
          <Grid item xs={6} textAlign="left">
            {/* <Button variant="cancel">Cancel</Button> */}
            <Button>Change</Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ChangePassword;