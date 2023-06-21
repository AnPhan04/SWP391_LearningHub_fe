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
      return json;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /* fetch API to show all notes */
  const [noteTitles, setNoteTitles] = useState([]);
  const [noteIds, setNoteIds] = useState([]);
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
          const ids = jsonData.data.map((note) => note.id);
          setNoteTitles(titles);
          setNoteIds(ids);
        }
      } catch (error) {
        setNoteTitles([]);
        setNoteIds([]);
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

  const deleteNote = async (noteId) => {
    console.log("Delete note " + noteId);
    try {
      const noteIndex = noteIds.indexOf(noteId);
      if (noteIndex !== -1) {
        const deletedNote = noteTitles[noteIndex];
        const response = await fetch(
          `http://localhost:8080/api/v1/note/notes?id=${noteId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data.message);
        setNoteTitles((prevTitles) =>
          prevTitles.filter((title) => title !== deletedNote)
        );
        setNoteIds((prevIds) => prevIds.filter((id) => id !== noteId));
      }
    } catch (error) {
      console.log("Delete error: " + error);
    }
  };

  const navigate = useNavigate();
  const navToNoteScreen = (noteId) => {
    navigate(`/note?id=${noteId}`);
  };

  return (
    <Grid container spacing={2}>
      {/* number of cards = number of notes of each logged in user */}
      {noteTitles.length > 0 ? (
        noteTitles.map((note, index) => (
          <Card
            onClick={(e) => {
              if (e.target.tagName !== "BUTTON") {
                navToNoteScreen(noteIds[index]);
              }
            }}
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
                  <MenuList
                    onEdit={() => editNote(note)}
                    onDelete={(e) => {
                      e.stopPropagation(); // Stop event propagation
                      deleteNote(noteIds[index]);
                    }}
                  />
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
