import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserDashBoard from "../pages/User/UserDashboard";
import FlipCard from "../pages/Flashcard/FlipCard";
import CardList from "../pages/Flashcard/CardList";
import FlashcardDashBoard from "../pages/Flashcard/FlashcardDashBoard";
import ChangePassword from "../pages/User/ChangePassword";
import AccountSetting from "../pages/User/AccountSetting";
import FeatureList from "../pages/Admin/FeatureList";
import ResetPassword from "../pages/Auth/ResetPassword";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import TaskManagementDashBoard from "../pages/Task/TaskManagementDashboard";
import ErrorPage from "../pages/ErrorPage";
import NoteScreen from "../pages/NoteScreen/NoteScreen";
import Landing from "../pages/Landing";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
        errorElement: <ErrorPage />
    },
    {
        path: "/landing",
        element: <Landing />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <SignIn />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/flashcard",
        element: <FlipCard />
    },
    {
        path: "/cardList",
        element: <CardList />
    },
    {
        path: "/flashcardDash",
        element: <FlashcardDashBoard />,
        errorElement: <ErrorPage />
    },
    {
        path: "/forgotpassword",
        element: <ResetPassword />
    },
    {
        path: "/changepw",
        element: <ChangePassword />
    },
    {
        path: "/featurelist",
        element: <FeatureList />
    },
    {
        path: "/accountsetting",
        element: <AccountSetting />
    },
    {
        path: "/taskmanagement",
        element: <TaskManagementDashBoard />
    },
    {
        path: "/note",
        element: <NoteScreen />
    }
]);
export default routes;