import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import A from "../../common/assets";
import "./CardList.css";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "left",
  padding: "10px 20px",
  color: A.colors.black,
  height: "100%",
}));
const CardInSet = () => {
  return (
    <Box className="card-list" sx={{ flexGrow: 1, border: "none" }}>
      <Grid container spacing={0}>
        <Grid item xs={7} sx={{ borderRight: "1px solid #888" }}>
          <Item>
            Bandwidth may be thought of as the width of the 'pipe' through which
            data travels: <br />
            A. Greater the width, larger the amount of data can flow through it.{" "}
            <br />
            B. Smaller the width, larger the amount of data can flow through it.{" "}
            <br />
            C. Greater the width, smaller the amount of data can flow through
            it. <br />
            D. smaller the width, larger the amount of data can flow through it.
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Item>I don't know, wtf?</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardInSet;
