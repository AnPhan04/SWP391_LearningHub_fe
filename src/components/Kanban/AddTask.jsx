import Grid from "@mui/material/Grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import styled from "styled-components";
import MultipleSelect from "../MUIComponent/Dropdown";
import TextField from "../MUIComponent/TextField";
import TypoText from "../MUIComponent/TypoText";
import dayjs from "dayjs";
// import Button from "../MUIComponent/Button/Button";
import { Button } from "@mui/material";

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

export default function AddTask() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState(0);
  const [showAddScreen, setShowAddScreen] = useState(false);

  const handleEndDateChange = (newValue) => {
    if (startDate && newValue < startDate) {
      setEndDate(null);
      console.log("End date must be greater than start date");
    } else {
      setEndDate(newValue);
      calculateDuration(startDate, newValue);
      console.log(calculateDuration(startDate, newValue));
    }
  };

  const calculateDuration = (start, end) => {
    if (start && end) {
      /* pass the measurement "day" as the second arg
        or else the default will count in ms */
      const diff = dayjs(end).diff(dayjs(start), "day");
      if (diff > 1) {
        setDuration(diff + " days");
      } else {
        setDuration(diff + " day");
      }
      console.log(diff);
    } else {
      setDuration(0);
    }
  };

  const handleAdd = () => {
    setShowAddScreen(true);
  };

  const handleClose = () => {
    setShowAddScreen(false);
  };

  return (
    // <AddButton onClick={test}>+</AddButton>
    <>
      <AddButton onClick={handleAdd}>+</AddButton>
      {showAddScreen && (
        <Grid
          container
          spacing={0.5}
          alignItems="center"
          sx={{
            background: "white",
            width: "calc(100%-40px)",
            maxWidth: "1000px",
            minWidth: "300px",
            boxShadow: "0 0 10px #888888",
            position: "absolute",
            borderRadius: "5px",
            padding: "68px 68px",
          }}
        >
          <Grid item xs={8}>
            <TypoText
              variant="h5"
              style={{
                color: "#a1a1a1",
                fontWeight: "bold",
                padding: "0 5px",
                marginBottom: 0,
              }}
            >
              NAME
            </TypoText>
            <TextField
              required
              fullWidth
              id="name"
              // label="Name"
              name="name"
              sx={{ borderRadius: "8px", padding: "0 5px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TypoText
              variant="h5"
              style={{
                color: "#a1a1a1",
                fontWeight: "bold",
                padding: "0 5px",
                marginBottom: 0,
              }}
            >
              LABEL
            </TypoText>
            <MultipleSelect />
          </Grid>
          <Grid item xs={12}>
            <TypoText
              variant="h5"
              style={{
                color: "#a1a1a1",
                fontWeight: "bold",
                padding: "0 5px",
                marginBottom: 0,
              }}
            >
              DESCRIPTION
            </TypoText>
            <TextField
              multiline
              rows={2}
              // label="Description"
              sx={{ width: "100%", padding: "0 5px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TypoText
              variant="h5"
              style={{
                color: "#a1a1a1",
                fontWeight: "bold",
                padding: "0 5px",
                marginBottom: 0,
              }}
            >
              START DATE
            </TypoText>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%", borderRadius: "15px", padding: "0 5px" }}
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <TypoText
              variant="h5"
              style={{
                color: "#a1a1a1",
                fontWeight: "bold",
                padding: "0 5px",
                marginBottom: 0,
              }}
            >
              END DATE
            </TypoText>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%", borderRadius: "15px", padding: "0 5px" }}
                value={endDate}
                onChange={handleEndDateChange}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <TypoText
              variant="h5"
              style={{
                color: "#a1a1a1",
                fontWeight: "bold",
                padding: "0 5px",
                marginBottom: 0,
              }}
            >
              DURATION
            </TypoText>
            <TextField
              disabled
              value={duration}
              sx={{ width: "100%", padding: "0 5px" }}
            />
          </Grid>
          <Grid item xs={11} sx={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              sx={{ margin: "1.5rem 10px" }}
              size="large"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" size="large" onClick={handleClose}>
              Add
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
