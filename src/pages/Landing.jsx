import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";

const Landing = () => {
  return (
    <div>
    <Header />
    <div className="dashboard-container" style={{justifyContent:"center",width:"100%",}}>
        <img src="/img/error.png" alt="404 " style={{margin:"5rem 0"}}/>
    </div>
    <Footer />
  </div>
  );
};

export default Landing;
