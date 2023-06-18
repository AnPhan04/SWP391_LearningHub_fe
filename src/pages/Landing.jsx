import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";

const Landing = () => {
  return (
    <div>
    <Header />
    <div className="dashboard-container">
      <div className="left-side">
        <NavBar />
      </div>
      <div className="right-side">
        
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default Landing;
