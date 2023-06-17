import React from "react";
import "../Dashboard.css";
import Header from "../../components/layout/Header";
import RecentlyVisited from "../../components/MUIComponent/RecentlyVisited";
import TypoText from "../../components/MUIComponent/TypoText";
import NavBar from "../../components/layout/NavBar";

const TaskManagementDashBoard = () => {
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
              YOUR NOTES
            </TypoText>
            <div className="dashboard-container-content notes-container">
              {/* List notes */}
              <RecentlyVisited />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagementDashBoard;
