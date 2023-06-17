import React from "react";
import "./UserDashboard.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProfileButton from "../components/MUIComponent/ProfileButton";
import ButtonLink from "../components/MUIComponent/ButtonLink";
import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import FlashcardDashBoard from "./FlashcardDashBoard";

const UserDashBoard = (props) => {
  return (
      <div>
        <Header logged={props.logged}/>
        <div className="dashboard-container">
          <div className="sidebar">
            <h1 className="sidebar-title">Learning Hub</h1>
            <button className="sidebar-button">Task Management</button>
            <button className="sidebar-button">Pomodoro</button>
            {/* <button className="sidebar-button">Flashcard</button> */}
            <ButtonLink href="/flashcard">Flashcard</ButtonLink>
          </div>
          <div className="content">
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
        <Footer />
      </div>
  );
};

export default UserDashBoard;
