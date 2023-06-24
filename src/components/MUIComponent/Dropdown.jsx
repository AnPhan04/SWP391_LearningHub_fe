import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as MUISelect } from "@mui/material";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";

const Select = styled(MUISelect)(() => ({
  borderRadius: "15px",
  // boxShadow: "0 0 10px #888888",
  background: "white",
}));

/* function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
} */

export default function MultipleSelect() {
  const [id, setId] = useSearchParams();
  const noteId = id.get("id");
  console.log("Dropdown:" + noteId);

  const [personName, setPersonName] = useState([]);
  const [labelName, setLabelName] = useState([]);
  const [boardId, setBoardId] = useState("");
  
  useEffect(() => {
    const getBoardId = async () => {
      fetch(`http://localhost:8080/api/v1/note/board?noteId=${noteId}`, {
        credentials: "include",
        method: "GET",
      })
        .then((response) => response.json())
        .then((jsonData) => {
          console.log(jsonData);
          console.log(jsonData.data.id);
          setBoardId(jsonData.data.id);
        });
    };
    const getLabelsList = async () => {
      fetch(
        `http://localhost:8080/api/v1/labels/getLabelsByBoardId?boardId=${boardId}`,
        {
          credentials: "include",
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((jsonData) => {
          if (Array.isArray(jsonData)) { // Check if jsonData is an array
            const labelNames = jsonData.map((item) => item.name);
            console.log("label names", labelNames);
            setLabelName(labelNames);
          } else {
            console.error("Invalid JSON data:", jsonData);}
        });
    };
      getBoardId();
    getLabelsList();
  }, [noteId, boardId]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: "100%", padding: "0 5px" }}>
        {/* <InputLabel id="demo-multiple-name-label">Label</InputLabel> */}
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Label" />}
          // MenuProps={MenuProps}
        >
          {labelName.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
