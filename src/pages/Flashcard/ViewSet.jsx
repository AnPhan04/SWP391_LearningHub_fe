import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FlashcardSet from "../../components/MUIComponent/Flashcard/FlashcardSet";
import "../../components/MUIComponent/Flashcard/FlashcardSet.css";
// get flashcards of set

const ViewSet = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [id, setId] = useSearchParams();
  const [title, setTitle] = useSearchParams();
  const flashcardSetId = id.get("id");
  const flashcardSetName = title.get("title");

  useEffect(() => {
    const getFlashcardsOfSet = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/flashcard/card?id=${flashcardSetId}`,
        {
          credentials: "include",
        }
      );
      const jsonData = await response.json();
      setFlashcards(jsonData.data);
    };
    getFlashcardsOfSet();
  }, []);

  return (
    <div>
      <div className="card-flip">
        <FlashcardSet flashcards={flashcards} title={flashcardSetName}/>
      </div>
    </div>
  );
};

export default ViewSet;
