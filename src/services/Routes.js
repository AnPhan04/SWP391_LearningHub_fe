import React from "react";
import { createBrowserRouter } from "react-router-dom";
import CardAttachmentComponent from "../components/CardAttachmentComponent";
import EmailForm from "../components/EmailForm";
import LabelsList from "../components/MUIComponent/LabelList";
import Labels from "../components/MUIComponent/Labels";
import AboutUs from "../pages/AboutUs";
import AdminMain from "../pages/Admin/AdminMain";
import FeatureList from "../pages/Admin/FeatureList";
import UpdateCoreLabel from "../pages/Admin/UpdateCoreLabel";
import Deactive from "../pages/Auth/Deactive";
import Reactive from "../pages/Auth/Reactive";
import ResetPassword from "../pages/Auth/ResetPassword";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import ErrorPage from "../pages/ErrorPage";
import CardList from "../pages/Flashcard/CardList";
import CreateSet from "../pages/Flashcard/CreateSet";
import FlashcardDashBoard from "../pages/Flashcard/FlashcardDashBoard";
import UpdateSet from "../pages/Flashcard/UpdateSet";
import ViewSet from "../pages/Flashcard/ViewSet";
import Otp from "../pages/FogetPassWord/Otp";
import ResetPass from "../pages/FogetPassWord/ResetPass";
import Landing from "../pages/Landing";
import NoteScreen from "../pages/NoteScreen/NoteScreen";
import TaskManagementDashBoard from "../pages/Task/TaskManagementDashboard";
import AccountSetting from "../pages/User/AccountSetting";
import ChangePassword from "../pages/User/ChangePassword";
import EditProfile from "../pages/User/EditProfile";
import UserDashBoard from "../pages/User/UserDashboard";

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
        path: "/contact",
        element: <EmailForm />
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
        path: "/attachment",
        element: <CardAttachmentComponent />,
        errorElement: <ErrorPage />
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
        path: "/about",
        element: <AboutUs />
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
        path: "/reactive",
        element: <Reactive />
        , errorElement: <ErrorPage />
    },
    {
        path: "/error",
        element: <ErrorPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/create-set",
        element: <CreateSet />,
        errorElement: <ErrorPage />
    },
    {
        path: "/otp",
        element: <Otp />,
        errorElement: <ErrorPage />
    },
    {
        path: "/resetpass",
        element: <ResetPass />,
        errorElement: <ErrorPage />
    },
    {
        path: "/update-set",
        element: <UpdateSet />,
        errorElement: <ErrorPage />
    }
]);
export default routes;