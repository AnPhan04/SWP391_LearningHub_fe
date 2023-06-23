import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Input from "../MUIComponent/Input";
import MultipleSelect from "../MUIComponent/Dropdown";
import TextField from "../MUIComponent/TextField";

const AddButton = styled.button`
  &&& {
    background-color: #e3e3e3;
    color: white;
    margin-top: 15px;
    // padding: 15px 20px;
    font-weight: 600;
    font-size: 20px;
    padding: 5px 0;
    border: none;
  }
`;

const handleSubmit = () => {};
export default function AddTask() {
  return (
    // <AddButton onClick={test}>+</AddButton>
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ background: "grey" }}
      >
        <Grid item xs={8}>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            sx={{ borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={4}>
          <MultipleSelect />
        </Grid>
      </Grid>
    </>
  );
}

function test() {
  alert("button pressed");
}
