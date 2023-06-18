import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardContent, Grid } from "@mui/material";
import TypoText from "./TypoText";
import MenuList from "../MUIComponent/MenuList";
import QuickAdd from "./QuickAdd";

const RecentlyVisited = () => {
  /* fetch API to check current user in session */
  const Current = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/current",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      // console.log(json);
      return json;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /* fetch API to show all notes */
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
          // console.log("Titles: " + titles);
        }
      } catch (error) {
        setNoteTitles([]);
      }
    };
    // console.log("noteTitles: " + noteTitles);

    const fetchNotes = async () => {
      const sessionUser = await Current();
      if (sessionUser != null) {
        await getListNotes();
      }
    };
    fetchNotes();
  }, []);

  const editNote = async (note) => {
    console.log("Edit Note:", note);
  };

  return (
    <Grid container spacing={2}>
      {/* number of cards = number of notes of each logged in user */}
      {noteTitles.length > 0 ? (
        noteTitles.map((note) => (
          <Card
            key={note}
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
                  <TypoText variant="h3">{note}</TypoText>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <MenuList onEdit={() => editNote(note)} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <TypoText style={{ marginBottom: "20px", marginLeft: "1em" }}>
          No notes available
        </TypoText>
      )}
      <QuickAdd />
    </Grid>
  );
};

export default RecentlyVisited;
