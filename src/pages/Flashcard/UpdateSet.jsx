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
  const [flashcardsId, setFlashcardsId] = useState([]);
  const [maxFlashcardId, setMaxFlashcardId] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    getCurrentUserEmail();
    getSetDetails();
    getFlashcardsBySetId();
    getMaxFlashcardId();
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
      setFlashcardsId(flashcardsDetails.data.map((f) => f.id));
      setCardListCount(flashcardsDetails.data.length);
      setTerms(flashcardsDetails.data.map((f) => f.term));
      setDefinitions(flashcardsDetails.data.map((f) => f.definition));
    } catch (error) {
      console.log(error);
    }
  };

  const getMaxFlashcardId = async () => {
    const response = await fetch(
      "http://localhost:8080/api/v1/flashcard/card/latest",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const jsonData = await response.json();
    setMaxFlashcardId(jsonData.data.id);
  };

  const handleBack = () => {
    navigate(-1);
  };
  const openAddCard = () => {
    // Add new card fields
    setTerms((prevTerms) => [...prevTerms, null]);
    setDefinitions((prevDefinitions) => [...prevDefinitions, null]);
    setCardListCount((prevCount) => prevCount + 1);
    setFlashcardsId([...flashcardsId, maxFlashcardId + 1]);
    setMaxFlashcardId(maxFlashcardId + 1); // Increment maxFlashcardId for the new card
  };

  const handleUpdateSet = async () => {
    if (!title) {
      alert("Please enter the set title!");
      return;
    }

    if (cardListCount < 2) {
      alert("A set need to have at least two cards!");
      return;
    }

    try {
      // Update set
      const updatedSet = {
        id: parseInt(id),
        userId: sessionUser,
        title: title,
        description: description,
        createdDate: new Date().toISOString().split("T")[0],
        active: 1,
        learned: 0,
      };

      await fetch("http://localhost:8080/api/v1/flashcard/set", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSet),
      });

      // Update cards
      for (let i = 0; i < cardListCount; i++) {
        const cardPayload = {
          id: flashcardsId[i],
          setId: parseInt(id),
          term: terms[i],
          definition: definitions[i],
          position: i,
        };

        console.log(flashcardsId[i]);
        console.log(maxFlashcardId);

        if (flashcardsId[i] !== maxFlashcardId) {
          // If the card exists (i.e., it has an ID), update it
          await fetch("http://localhost:8080/api/v1/flashcard/card", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cardPayload),
          });
        } else {
          await fetch("http://localhost:8080/api/v1/flashcard/card", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cardPayload),
          });
        }
      }

      navigateToViewSet(id);
    } catch (error) {
      console.log(error);
    }
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

  const handleDeleteCard = async (flashcardId, index) => {
    console.log(flashcardId);
    const response = await fetch(
      `http://localhost:8080/api/v1/flashcard/card?id=${flashcardId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      setCardListCount((prevCount) => prevCount - 1);
      setTerms((prevTerms) => {
        const newTerms = [...prevTerms];
        console.log(newTerms.splice(index, 1));
        return newTerms;
      });
      setDefinitions((prevDefinitions) => {
        const newDefinitions = [...prevDefinitions];
        console.log(newDefinitions.splice(index, 1));
        return newDefinitions;
      });
      console.log("Delete flashcard successfully!");
    }
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
              handleDeleteCard={() =>
                handleDeleteCard(flashcardsId[index], index)
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
            onClick={openAddCard}
          >
            + ADD CARD
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default UpdateSet;
