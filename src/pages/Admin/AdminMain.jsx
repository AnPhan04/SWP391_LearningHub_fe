import React, { useRef, useState } from "react";
// import "./UserDashboard.css";
import "../Dashboard.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";
import ProfileButton from "../../components/MUIComponent/ProfileButton";
import FlashcardDashboard from "../Flashcard/FlashcardDashBoard";
import TaskManagementDashBoard from "../Task/TaskManagementDashboard";
import FeatureList from "./FeatureList";
import UpdateCoreLabel from "./UpdateCoreLabel";

const AdminMain = () => {
    const [destination, setDestination] = useState("featurelist");
    let path = localStorage.getItem('path');
    if (path !== null && path !== destination) {
        setDestination(path);
    }
    const des = () => {
        //store the first destination
        switch (destination) {
            case "flashcard":
                return (<FlashcardDashboard />);
            case "task":
                return (<TaskManagementDashBoard />);
            case "featurelist":
                return (<FeatureList />);
            case "updateCoreLabel":
                return (<UpdateCoreLabel />);
            default:
                break;
        }
    }

    const handleOnClick = (value) =>{
        localStorage.setItem('path', value);
        setDestination(value);
    }

    return (
        // <BrowserRouter>
        <div>
            <Header />
            <div className="dashboard-container">
                <div className="left-side">
                    <div style={{ margin: 0 }}>
                        <Link to="#" onClick={() => handleOnClick("featurelist")}>
                            <ProfileButton>Feature enable</ProfileButton>
                        </Link>
                        <Link to="#" onClick={() => handleOnClick("updateCoreLabel")}>
                            <ProfileButton>Core labels</ProfileButton>
                        </Link>
                        <Link to="#" onClick={() => handleOnClick("task")}>
                            <ProfileButton>Task Management</ProfileButton>
                        </Link>
                        <Link to="#" onClick={() => handleOnClick("flashcard")}>
                            <ProfileButton>Flashcard</ProfileButton>
                        </Link>

                    </div>
                </div>
                <div className="right-side">
                    {des()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminMain;
