import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserDashBoard from "../pages/UserDashboard";
import FlipCard from "../pages/Flashcard/FlipCard";
import CardList from "../pages/Flashcard/CardList";
import FlashcardDashBoard from "../pages/FlashcardDashBoard";
import ChangePassword from "../pages/ChangePassword";
import AccountSetting from "../pages/AccountSetting";
import UserList from "../pages/UserList";
import ResetPassword from "../pages/ResetPassword";
import SignIn from "../pages/SignIn";
const routes = createBrowserRouter([
{
    path:"/",
    element:<UserDashBoard />
},
{
    path:"/login",
    element:<SignIn />
},
{
    path:"/flashcard",
    element:<FlipCard />
},
{
    path:"/cardList",
    element:<CardList />
},
{
    path:"/flashcardDash",
    element:<FlashcardDashBoard />
},
{
    path:"/forgotpassword",
    element:<ResetPassword />
},
{
    path:"/changepw",
    element:<ChangePassword />
},
{
    path:"/userlist",
    element:<UserList />
},
{
    path:"/accountsetting",
    element:<AccountSetting />
},
]);
export default routes;