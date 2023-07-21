import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
} from "@mui/material";
import CardList from "./CardList";
import Header from "../../components/layout/Header";
import TypoText from "../../components/MUIComponent/TypoText";

const UpdateSet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionUser, setSessionUser] = useState("");
  const [cardListCount, setCardListCount] = useState(2);
  const [terms, setTerms] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    getCurrentUserEmail();
    getSetDetails();
    getFlashcardsBySetId();
  }, []);

  const navigateToViewSet = (id) => {
    const url = `/set?id=${id}&title=${encodeURIComponent(title)}`;
    navigate(url);
  };

  const getCurrentUserEmail = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/current",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      console.log("getCurrentUserEmail: " + json.email);
      setSessionUser(json.email);
    } catch (error) {
      console.log(error);
    }
  };

  const getSetDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/flashcard/setById?setId=${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const setDetails = await response.json();
      setTitle(setDetails.data.title);
      setDescription(setDetails.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const getFlashcardsBySetId = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/flashcard/flashcardBySetId?setId=${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const flashcardsDetails = await response.json();
      setFlashcards(flashcardsDetails.data.map((f) => f.id));
      setCardListCount(flashcardsDetails.data.length);
      setTerms(flashcardsDetails.data.map((f) => f.term));
      setDefinitions(flashcardsDetails.data.map((f) => f.definition));
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleUpdateSet = async () => {
    if (!title) {
      alert("Please enter the set title!");
      return;
    }
    try {
      const updatedSet = {
        id: parseInt(id),
        userId: sessionUser,
        title: title,
        description: description,
        createdDate: new Date().toISOString().split("T")[0],
        active: 1,
        learned: 0,
      };

      // Update the set using API 1
      await fetch("http://localhost:8080/api/v1/flashcard/set", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSet),
      });
      // Update or add new cards using API 2
      for (let i = 0; i < cardListCount; i++) {
        const cardPayload = {
          id: i < flashcards.length ? flashcards[i] : null,
          setId: parseInt(id),
          term: terms[i],
          definition: definitions[i],
          position: i,
        };

        console.log(flashcards[i]);
        console.log(terms[i]);
        console.log(definitions[i]);

        if (i < terms.length) {
          // If the card exists (i.e., it has an ID), update it
          await fetch("http://localhost:8080/api/v1/flashcard/card", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cardPayload),
          });
        } else {
          // If the card does not exist (i.e., it does not have an ID), add it as a new card
          await fetch("http://localhost:8080/api/v1/flashcard/card", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cardPayload),
          });
        }
      }

      // Redirect to the set view page after successful update
      navigateToViewSet(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCard = () => {
    // Add new card fields
    setTerms((prevTerms) => [...prevTerms, { id: null, term: "" }]);
    setDefinitions((prevDefinitions) => [
      ...prevDefinitions,
      { id: null, definition: "" },
    ]);
    setCardListCount((prevCount) => prevCount + 1);
  };

  const handleTermChange = (index, term) => {
    setTerms((prevTerms) => {
      const newTerms = [...prevTerms];
      newTerms[index] = term;
      return newTerms;
    });
  };

  const handleDefinitionChange = (index, definition) => {
    setDefinitions((prevDefinitions) => {
      const newDefinitions = [...prevDefinitions];
      newDefinitions[index] = definition;
      return newDefinitions;
    });
  };

  return (
    <div>
      <Header />
      <div
        style={{
          padding: "3em 2.5rem",
          maxWidth: "81.25em",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Grid container spacing={2} style={{ alignItems: "center" }}>
          <Grid item xs={0.5} style={{ padding: "0 16px" }}>
            <ArrowBackIcon
              onClick={handleBack}
              fontSize="large"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#F2F2F2",
                  borderRadius: "7px",
                },
              }}
            />
          </Grid>
          <Grid item xs={7.5} style={{ padding: "0 5px" }}>
            <TypoText variant="h5" style={{ margin: 0 }}>
              Back to set
            </TypoText>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ background: "#9747ff", borderRadius: "5px" }}
              onClick={handleUpdateSet}
            >
              DONE
            </Button>
          </Grid>
        </Grid>
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "50%" }}>
          <Input
            id="standard-adornment-weight"
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "TITLE",
            }}
            placeholder="Enter a title, like 'SWP391'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormHelperText id="standard-weight-helper-text">
            TITLE
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, mt: 1, width: "50%" }}>
          <Input
            id="standard-adornment-weight"
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "DESCRIPTION",
            }}
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormHelperText id="standard-weight-helper-text">
            DESCRIPTION
          </FormHelperText>
        </FormControl>
        {cardListCount > 0 &&
          [...Array(cardListCount)].map((_, index) => (
            <CardList
              key={index}
              counter={index + 1}
              handleTermChange={(term) => {
                handleTermChange(index, term);
              }}
              handleDefinitionChange={(definition) =>
                handleDefinitionChange(index, definition)
              }
              term={terms[index]} // Pass the correct term value
              definition={definitions[index]} // Pass the correct definition value
            />
          ))}

        <Grid item xs={4} sx={{ mt: 3, textAlign: "left" }}>
          <Button
            variant="contained"
            size="large"
            sx={{ background: "#9747ff", borderRadius: "5px" }}
            onClick={handleUpdateSet}
          >
            + ADD CARD
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default UpdateSet;
