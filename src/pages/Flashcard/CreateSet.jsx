import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypoText from "../../components/MUIComponent/TypoText";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
} from "@mui/material";
import CardList from "./CardList";

const CreateSet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionUser, setSessionUser] = useState("");
  const [cardListCount, setCardListCount] = useState(2);
  const [terms, setTerms] = useState([]); // State variable to store term values
  const [definitions, setDefinitions] = useState([]);
  const [flashcardSetId, setFlashcardSetId] = useState(null);

  useEffect(() => {
    getCurrentUserEmail();
  }, []);

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

  const createSet = async () => {
    const setRequestBody = {
      userId: sessionUser,
      title: title,
      description: description,
      createdDate: new Date().toISOString().split("T")[0],
      active: true,
      learned: false,
    };
  
    try {
      const createSetResponse = await fetch(
        "http://localhost:8080/api/v1/flashcard/set",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(setRequestBody),
        }
      );
  
      if (createSetResponse.ok) {
        // Fetch the latest set ID
        const latestSetResponse = await fetch(
          "http://localhost:8080/api/v1/flashcard/set/latest",
          {
            method: "GET",
            credentials: "include",
          }
        );
  
        if (latestSetResponse.ok) {
          const latestSetData = await latestSetResponse.json();
          const setId = latestSetData.data.id;
          console.log(setId);
          setFlashcardSetId(setId);
  
          // Create flashcards in the set
          for (let i = 1; i <= cardListCount; i++) {
            const cardListRequestBody = {
              setId: setId,
              term: terms[i - 1], // Use the term value from the array
              definition: definitions[i - 1],
              position: i,
            };
            await createFlashcard(cardListRequestBody);
          }
  
          // navigateToViewSet(); 
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const createFlashcard = async (requestBody) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/flashcard/card",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSet = async () => {
    if (!title) {
      alert("Please enter the set title!");
      return;
    }

    await createSet();
    setTitle("");
    setDescription("");
    setTerms([]);
    setDefinitions([]);
    // await navigateToViewSet();
  };

  // const navigate = useNavigate();
  // const navigateToViewSet = () => {
  //   const url = `/set?id=${flashcardSetId}&title=${encodeURIComponent(title)}`;
  //   navigate(url);
  // };
  const handleAddCard = () => {
    setCardListCount((prevCount) => prevCount + 1);
    console.log(flashcardSetId);
  };

  const handleTermChange = (term, index) => {
    setTerms((prevTerms) => {
      const updatedTerms = [...prevTerms];
      updatedTerms[index - 1] = term;
      return updatedTerms;
    });
  };

  const handleDefinitionChange = (definition, index) => {
    setDefinitions((prevDefinitions) => {
      const updatedDefinitions = [...prevDefinitions];
      updatedDefinitions[index - 1] = definition;
      return updatedDefinitions;
    });
  };

  return (
    <div
      style={{
        padding: "3em 2.5rem",
        maxWidth: "81.25em",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TypoText variant="h1">Create a new study set</TypoText>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            size="large"
            sx={{ background: "#9747ff", borderRadius: "5px" }}
            onClick={handleCreateSet}
          >
            CREATE
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
        <FormHelperText id="standard-weight-helper-text">TITLE</FormHelperText>
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
      {[...Array(cardListCount)].map((_, index) => (
        <CardList
          key={index}
          counter={index + 1}
          handleTermChange={handleTermChange}
          handleDefinitionChange={handleDefinitionChange}
          term={terms[index]}
          definition={definitions[index]}
        />
      ))}
      <Grid item xs={4} sx={{ mt: 3, textAlign: "left" }}>
        <Button
          variant="contained"
          size="large"
          sx={{ background: "#9747ff", borderRadius: "5px" }}
          onClick={handleAddCard}
        >
          + ADD CARD
        </Button>
      </Grid>
    </div>
  );
};

export default CreateSet;
