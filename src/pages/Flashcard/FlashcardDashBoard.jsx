import React from "react";
import RecentlyVisitedSet from "../../components/MUIComponent/Flashcard/RecentlyVisitedSet";
import TypoText from "../../components/MUIComponent/TypoText";
import "../Dashboard.css";
const FlashcardDashboard = () => {
  return (
    <div>
      <div>
        <TypoText variant="h1" style={{ fontWeight: "bold", margin: "30px" }}>
          YOUR SETS
        </TypoText>
        <div className="dashboard-container-content sets-container">
          <RecentlyVisitedSet />
        </div>
      </div>
    </div>
  );
};

export default FlashcardDashboard;
