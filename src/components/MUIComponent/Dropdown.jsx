import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

/* function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
} */

export default function MultipleSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  /* const Current = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/current",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      console.log("current " + json);
      return json;
    } catch (error) {
      console.log(error);
      return null;
    }
  }; */
  // TODO get boardId
  const [labelName, setLabelName] = useState([]);
  useEffect(() => {
    const getLabelsList = async () => {
      fetch(
        "http://localhost:8080/api/v1/labels/getLabelsByBoardId?boardId=1",
        {
          credentials: "include",
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((jsonData) => {
          console.log(jsonData);
          const labelNames = jsonData.map((item) => item.name); 
          console.log(labelNames);
          setLabelName(labelNames);
        });
    };
    getLabelsList();
  }, []);

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
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Label</InputLabel>
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
