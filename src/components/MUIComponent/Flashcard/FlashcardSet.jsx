import React, { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import TypoText from "../TypoText";
import "./FlashcardSet.css";
import ProgressBar from "./ProgressBar";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const FlashcardSet = ({ flashcards, title }) => {
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

  const [name, setName] = useState(null);

  useEffect(() => {
    const uniqueSetId = [...new Set(flashcards.map((f) => f.setId))];
    const flSetName = flashcards.find((s) => s.setId === uniqueSetId);
    console.log(flSetName);
    setName();
    console.log(flashcards.find((s) => s.setId === uniqueSetId));
  }, [flashcards]);

  console.log(name);

  return (
    <div className="set">
      <div className="set-title" style={{ margin: "3em" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <TypoText variant="h1">{title}</TypoText>
          </Grid>
        </Grid>
      </div>
      <div className="flashcard-container">
        <Flashcard
          term={flashcards[currentCardIndex]?.term}
          definition={flashcards[currentCardIndex]?.definition}
        />
      </div>
      <div className="setting-container">
        <button className="setting-icon">
          <FontAwesomeIcon icon={faCog} />
        </button>
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
      </div>
      <div>
        <ProgressBar flashcards={flashcards} counter={counter} />
      </div>
    </div>
  );
};

export default FlashcardSet;
