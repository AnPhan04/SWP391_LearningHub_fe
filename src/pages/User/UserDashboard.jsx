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

const UserDashBoard = (props) => {
  return (
    
    // <BrowserRouter>
    <div>
      {console.log(props.logged)}
      <Header logged={props.logged} />
      <div className="dashboard-container">
        <div className="left-side">
          <NavBar />
        </div>
        <div className="content right-side">
          <div className="recent-note">
            <h2 className="section-title">Recently Visited Note</h2>
            <div className="note-buttons">
              <button className="note-button"></button>
              <button className="note-button"></button>
              <button className="note-button"></button>
            </div>
          </div>
          <div className="recent-flashcard">
            <h2 className="section-title">Recently Visited Flashcard</h2>
            <div className="flashcard-buttons">
              <button className="flashcard-button"></button>
              <button className="flashcard-button"></button>
              <button className="flashcard-button"></button>
            </div>
          </div>
          <button className="pomodoro-button">
            Want to study effectively? Try our Pomodoro
          </button>
        </div>
      </div>
      {/* used in parent route elements to render their child route elements
        => allow nested UI to show up when child routes are rendered */}
      <Outlet />
    </div>
  );
};

export default UserDashBoard;
