import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardContent, Grid } from "@mui/material";
import TypoText from "./TypoText";
import MenuList from "../MUIComponent/MenuList";

const RecentlyVisited = () => {
  const [noteTitles, setNoteTitles] = useState([]);
  useEffect(() => {
    const getListNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/note/notes",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const jsonData = await response.json();
        if (jsonData.status === "Success" && jsonData.data) {
          const titles = jsonData.data.map((note) => note.title);
          setNoteTitles(titles);
        }
        console.log(noteTitles);
      } catch (error) {
        setNoteTitles([]);
      }
    };
    const localStorageData = localStorage.getItem("sessionData");
    const sessionUser = JSON.parse(localStorageData);

    if (sessionUser != null) {
      getListNotes();
    }
  }, []);

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
            {/* {noteTitles?.map((note) => {
              <TypoText variant="h2">{note.title}</TypoText>;
            })} */}
            <TypoText variant="h3">{noteTitles}</TypoText>
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
