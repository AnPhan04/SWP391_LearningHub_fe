import React from "react";
import Set from "../../components/MUIComponent/Flashcard/Set";
import TypoText from "../../components/MUIComponent/TypoText";
import Button from "../../components/MUIComponent/Button/Button";
import { Grid } from "@mui/material";
import ProgressBar from "../../components/MUIComponent/Flashcard/ProgressBar";
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
  //   study again state
  return (
    <div>
      <div className="set-title">
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <TypoText variant="h1">Set 1</TypoText>
          </Grid>
          <Grid item xs={6} sx={{ margin: "auto", textAlign: "center" }}>
            <Button>Study Again</Button>
          </Grid>
        </Grid>
      </div>

      <div className="card-flip">
        <Set flashcards={flashcards} />
      </div>
      <ProgressBar flashcards={flashcards} />
    </div>
  );
};

export default ViewSet;
