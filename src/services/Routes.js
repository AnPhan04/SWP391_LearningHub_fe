import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserDashBoard from "../pages/User/UserDashboard";
import ViewSet from "../pages/Flashcard/ViewSet";
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
import EditProfile from "../pages/User/EditProfile";
import Labels from "../components/MUIComponent/Labels";
import LabelsList from "../components/MUIComponent/LabelList";
import UpdateCoreLabel from "../pages/Admin/UpdateCoreLabel";
import AdminMain from "../pages/Admin/AdminMain";
import Deactive from "../pages/Auth/Deactive";

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
        element: <SignIn />,
        errorElement: <ErrorPage />
    },
    {
        path: "/signup",
        element: <SignUp />
        , errorElement: <ErrorPage />
    },
    {
        path: "/set",
        element: <ViewSet />
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
        , errorElement: <ErrorPage />
    },
    {
        path: "/changepw",
        element: <ChangePassword />
        , errorElement: <ErrorPage />
    },
    {
        path: "/featurelist",
        element: <FeatureList />
        , errorElement: <ErrorPage />
    },
    {
        path: "/accountsetting",
        element: <AccountSetting />
        , errorElement: <ErrorPage />
    },
    {
        path: "/taskmanagement",
        element: <TaskManagementDashBoard />
    },
    {
        path: "/note",
        element: <NoteScreen />
    },
    {
        path: "/dashboard",
        element: <UserDashBoard />
    },
    {
        path: "/profile",
        element: <EditProfile />
        , errorElement: <ErrorPage />
    },
    {
        path: "/addlabel",
        element: <Labels />
    },
    {
        path: "/listLabels",
        element: <LabelsList />
    },
    {
        path: "/updateCoreLabel",
        element: <UpdateCoreLabel />
        , errorElement: <ErrorPage />
    },
    {
        path: "/admin",
        element: <AdminMain />
        , errorElement: <ErrorPage />
    },
    {
        path: "/deactive",
        element: <Deactive />
        , errorElement: <ErrorPage />
    },
    {
        path: "/error",
        element: <ErrorPage />,
        errorElement: <ErrorPage />
    }
]);
export default routes;