import React from "react";
import "../Dashboard.css";
import RecentlyVisited from "../../components/MUIComponent/RecentlyVisited";
import TypoText from "../../components/MUIComponent/TypoText";
const TaskManagementDashBoard = () => {
  return (
    <div>
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
  );
};

export default TaskManagementDashBoard;
