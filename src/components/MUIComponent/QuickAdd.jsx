import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import TypoText from "./TypoText";

const QuickAdd = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addNote = async () => {
    const requestBody = {
      id: null,
      title: title,
      description: description,
      // get from session
      userId: "anpthe173136@fpt.edu.vn",
      createdDate: new Date().toISOString().split("T")[0],
    };
    try {
      const response = await fetch("http://localhost:8080/api/v1/note/notes", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      // Handle the response here if needed
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data.data.id;
      }
    } catch (error) {
      // Handle error here
      console.log(error);
      return null;
    }
  };

  const addBoard = async () => {
    const note_id = addNote();
    console.log("noteId: " + note_id);
    const requestBody = {
      id: null,
      name: title,
      createdDate: new Date().toISOString().split("T")[0],
      noteId: 12,
      active: true,
    };
    try {
      const response = await fetch("http://localhost:8080/api/v1/note/board", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      // Handle the response here if needed
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      // Handle error here
      console.log(error);
    }
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = () => {
    // addNote();
    addBoard();
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <Card
        onClick={handleAdd}
        sx={{
          margin: "0.5em 1.5em",
          width: 250,
          height: 150,
          cursor: "pointer",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <TypoText variant="h1">+</TypoText>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        // onClose={handleClose}
        PaperProps={{
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: "1rem" }}
          />
          <Button variant="contained" onClick={handleFormSubmit}>
            Add
          </Button>
          <Button variant="cancel" onClick={handleClose}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickAdd;
