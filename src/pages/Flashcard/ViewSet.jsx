import React from "react";
import Set from "../../components/MUIComponent/Flashcard/Set";
import "../../components/MUIComponent/Flashcard/Set.css";
// get flashcards of set
const flashcards = [
  {
    term: "Who is the dumbest guy in the world?",
    definition: "Minh Pham",
  },
  {
    term: "Only one in the world?",
    definition: "Of course no, there's still Hom met",
  },
  {
    term: "Who is the most intelligent girl in the world?",
    definition: "It's me, hi!",
  },
];
const ViewSet = () => {
  
  return (
    <div>
      <div className="card-flip">
        <Set flashcards={flashcards} />
      </div>
    </div>
  );
};

export default ViewSet;
