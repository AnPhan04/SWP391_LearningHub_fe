import React, { useState } from "react";
import Button from "../../components/MUIComponent/Button/Button";
import TextField from "../../components/MUIComponent/TextField";
import Link from "../../components/MUIComponent/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../../components/MUIComponent/TypoText";
import { Link as RouterLink } from "react-router-dom";
import A from "../../common/assets";
const CustomLink = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink to={href} ref={ref} {...other} />;
});
const CreateSet = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestBody = {
      id: 1,
      userId: "anpthe173136@fpt.edu.vn",
      title: "set 1",
      description: "first set",
      createDate: "2023-06-05",
      isActive: 1,
      isLearned: 0,
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/v1/flashcard/set  ",
        {
          method: "POST",
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
      } else {
        const errorData = await response.json();
        // Log the error message
        // console.log("Error:", errorData.message);
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      // Handle any network or other errors
      console.log("Error:", error.message);
    }
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
        Create FlashcardSet
      </TypoText>
      <TypoText variant="h5">
        Make a new doc to bring your words, data, and much more. For free.
      </TypoText>

      <TextField required fullWidth id="title" label="Title" name="title" />
      <TextField
        required
        fullWidth
        name="desc"
        label="Description"
        type="text"
        id="desc"
      />

      <Button style={{ width: "100%" }}>Create</Button>
      {errorMessage && (
        <TypoText variant="h4" style={{ color: "red" }}>
          {errorMessage}
        </TypoText>
      )}

      {/* <Grid container justifyContent="center">
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
              
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default CreateSet;
