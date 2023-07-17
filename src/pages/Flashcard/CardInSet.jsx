import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import A from "../../common/assets";
import "./CardList.css";
import { FormControl, FormHelperText, Input } from "@mui/material";

const Item = styled(Paper)(() => ({
  textAlign: "left",
  padding: "10px 20px",
  color: A.colors.black,
  height: "100%",
}));
const CardInSet = ({
  term,
  definition,
  handleTermInputChange,
  handleDefinitionInputChange,
}) => {
  return (
    <Box className="card-list" sx={{ flexGrow: 1, border: "none" }}>
      <Grid container spacing={0}>
        <Grid item xs={7} sx={{ borderRight: "1px solid #888" }}>
          <Item>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "70%" }}>
              <Input
                id="standard-adornment-weight"
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  "aria-label": "TERM",
                }}
                placeholder="Enter term"
                value={term}
                onChange={handleTermInputChange}
              />
              <FormHelperText id="standard-weight-helper-text">
                TERM
              </FormHelperText>
            </FormControl>
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Item>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "70%" }}>
              <Input
                id="standard-adornment-weight"
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  "aria-label": "DEFINITION",
                }}
                placeholder="Add a description..."
                value={definition}
                onChange={handleDefinitionInputChange}
              />
              <FormHelperText id="standard-weight-helper-text">
                DEFINITION
              </FormHelperText>
            </FormControl>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardInSet;
