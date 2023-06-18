import React from "react";
import "../Dashboard.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import MenuList from "../../components/MUIComponent/MenuList";
import RecentlyVisited from "../../components/MUIComponent/RecentlyVisited";
import TypoText from "../../components/MUIComponent/TypoText";
import NavBar from "../../components/layout/NavBar";
const FlashcardDashboard = () => {
  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="left-side">
          <NavBar />
        </div>

        <div className="right-side">
          <div>
            <TypoText
              variant="h1"
              style={{ fontWeight: "bold", margin: "30px" }}
            >
              YOUR SETS
            </TypoText>
            <div className="dashboard-container-content sets-container">
              {/* Flashcard sets */}
              <RecentlyVisited />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlashcardDashboard;
