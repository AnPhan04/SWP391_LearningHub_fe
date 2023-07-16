import React, { useState } from "react";
import Flashcard from "./Flashcard";
import TypoText from "../TypoText";
import "./Set.css";
import ProgressBar from "./ProgressBar";
import { Grid } from "@mui/material";
const Set = ({ flashcards }) => {
  const [counter, setCounter] = useState(1);
  const [disabledRight, setDisabledRight] = useState(false);
  const [disabledLeft, setDisabledLeft] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handlePrevCard = () => {
    setCounter(counter - 1);
    setDisabledLeft(counter - 1 === 1);
    setDisabledRight(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleNextCard = () => {
    setCounter(counter + 1);
    setDisabledRight(counter + 1 === flashcards.length);
    setDisabledLeft(false);
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  return (
    <div className="set">
      <div className="set-title">
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <TypoText variant="h1">Set 1</TypoText>
          </Grid>
        </Grid>
      </div>
      <div className="flashcard-container">
        <Flashcard
          term={flashcards[currentCardIndex].term}
          definition={flashcards[currentCardIndex].definition}
        />
      </div>
      <div className="progress-arrow">
        <button onClick={handlePrevCard} disabled={disabledLeft}>
          <i className="fa-solid fa-arrow-left fa-2xl"></i>
        </button>
        <TypoText style={{ display: "inline", margin: "1em" }}>
          {counter}/{flashcards.length}
        </TypoText>
        <button onClick={handleNextCard} disabled={disabledRight}>
          <i className="fa-solid fa-arrow-right fa-2xl"></i>
        </button>
      </div>
      <div>
        <ProgressBar flashcards={flashcards} counter={counter}/>
      </div>
    </div>
  );
};

export default Set;
