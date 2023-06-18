import React from "react";
import "./UserDashboard.css";
import "../Dashboard.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ButtonLink from "../../components/MUIComponent/ButtonLink";
import NavBar from "../../components/layout/NavBar";
import { Outlet, Route, Routes } from "react-router-dom";
import TaskManagementDashBoard from "../Task/TaskManagementDashboard";
import FlashcardDashboard from "../Flashcard/FlashcardDashBoard";
import TypoText from "../../components/MUIComponent/TypoText";
import RecentlyVisited from "../../components/MUIComponent/RecentlyVisited";

const UserDashBoard = () => {
  return (
    // <BrowserRouter>
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
              <RecentlyVisited />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashBoard;
