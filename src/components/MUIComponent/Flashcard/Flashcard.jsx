import React, { useState, useEffect } from "react";
import TypoText from "../TypoText";
import "./Flashcard.css";

const Flashcard = ({ term, definition }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    // use '!isFlipped' instead of 'true'
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const getFlashcardsOfSet = async () => {
      const response = await fetch('http://localhost:8080/api/v1/flashcard/card?id=1', {
        credentials: "include"
      });
      const jsonData = await response.json();
      console.log(jsonData);
    };
    getFlashcardsOfSet();
  }, []);

  return (
    <div className="flashcard" onClick={handleFlip}>
      <div className={`card ${isFlipped ? "isFlipped" : ""}`}>
        <div className="card-front">
          <TypoText variant="h2" style={{ padding: "3em" }}>
            {term}
          </TypoText>
        </div>
        <div className="card-back">
          <TypoText variant="h2" style={{ padding: "3em" }}>
            {definition}
          </TypoText>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
