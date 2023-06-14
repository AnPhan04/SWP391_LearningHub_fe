import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import ProfileButton from "../MUIComponent/ProfileButton";
import TaskManagementDashBoard from "../../pages/Task/TaskManagementDashboard";
import FlashcardDashboard from "../../pages/Flashcard/FlashcardDashBoard";

const NavBar = () => {
  return (
    <div style={{ margin: 0 }}>
      <Link to="/taskmanagement">
        <ProfileButton>Task Management</ProfileButton>
      </Link>
      <Link to="/flashcardDash">
        <ProfileButton>Flashcard</ProfileButton>
      </Link>
      {/* <Outlet /> */}
    </div>
  );
};

export default NavBar;
