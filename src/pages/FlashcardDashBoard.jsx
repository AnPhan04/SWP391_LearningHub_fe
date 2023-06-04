import React from 'react';
import './FlashcardDashBoard.css';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const FlashcardDashBoard = () => {
  return (
    <div>
      <Header></Header>
    <div className="container">
      <div className="left-column">
        <div className="learning-hub">Learning Hub</div>
        <button className="dashboard-button">Task Management ▼</button>
        <button className="dashboard-button">Pomodoro ▼</button>
        <button className="dashboard-button">Flashcard ▼</button>
      </div>
      <div className="right-column">
        <div className="flashcard-title">YOUR FLASHCARD</div>
        <div className="flashcard-container">
          {/* Flashcard sets */}
          <div className="flashcard-set">
            <div className="set-header">
              <div className="set-name">Flashcard Set 1</div>
              <div className="set-actions">
                <button className="set-action-button">...</button>
                <div className="set-action-dropdown">
                  <button className="set-action-dropdown-item">Edit</button>
                  <button className="set-action-dropdown-item">Delete</button>
                </div>
              </div>
            </div>
            <div className="set-info">10 cards</div>
            <div className="progress-bar"></div>
          </div>
          {/* Add new set */}
          <div className="add-new-set">
            <div className="add-new-icon">+</div>
            <div className="add-new-text">Add new set</div>
          </div>
        </div>
        
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default FlashcardDashBoard;
