import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardContent, Grid } from "@mui/material";
import TypoText from "./TypoText";
import MenuList from "../MUIComponent/MenuList";

const RecentlyVisited = () => {
  return (
    <Card
      sx={{
        margin: "0.5em 1.5em",
        width: 250,
        height: 150,
        cursor: "pointer",
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TypoText variant="h2">Note 1</TypoText>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <MenuList />
          </Grid>
        </Grid>

        <TypoText variant="h5">10 cards</TypoText>
      </CardContent>
    </Card>
  );
};

export default RecentlyVisited;
