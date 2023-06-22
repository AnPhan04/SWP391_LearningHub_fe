import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      console.log("current " +json);
      return json;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /* fetch API to show all notes */
  const [notes, setNotes] = useState([]);
//fetch data for the first time
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
          setNotes(jsonData.data);
          console.log("success "+notes);
        }
      } catch (error) {
        console.log(error);
        setNotes([]);
      }
    };

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

  const archiveNote = async (noteId) => {
    console.log("Archive note " + noteId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/note/notes?noteId=${noteId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      console.log(jsonData.data);
      if (response.ok) {
        console.log(jsonData.message);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      }
    } catch (error) {
      console.log("Archive note error: " + error);
    }
  };

  const navigate = useNavigate();
  const navToNoteScreen = (noteId) => {
    navigate(`/note?id=${noteId}`);
  };

  return (
    <Grid container spacing={2}>
      {/* number of cards = number of notes */}
      {notes.map((note) => {
        const { id, title, active } = note;
        if (active) {
          return (
            <Card
              onClick={(e) => {
                if (e.target.tagName !== "BUTTON") {
                  navToNoteScreen(id);
                }
              }}
              key={id}
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
                    <TypoText variant="h3">{title}</TypoText>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <MenuList
                      onEdit={(e) => {
                        e.stopPropagation();
                        editNote(note);
                      }}
                      onDelete={(e) => {
                        e.stopPropagation(); // Stop event propagation
                        archiveNote(id);
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        } else {
          return null; // Don't render inactive notes
        }
      })}
      <QuickAdd />
    </Grid>
  );
};

export default RecentlyVisited;
