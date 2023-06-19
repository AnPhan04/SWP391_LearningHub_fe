import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import styled from "@emotion/styled";

const H1 = styled.h1`
  filter: blur(10px);
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 20%;
  font-family: cursive;
  letter-spacing: 20px;
  text-align: center;
  transition: 0.3s all;
  &:hover {
    filter: blur(0);
  }
`

const Landing = () => {
  return (
    <div>
    <Header />
    <H1>Welcome to Learning Hub❤️</H1>
    <div className="dashboard-container" style={{justifyContent:"center",width:"100%",}}>
        <img src="/img/landing.jpg" alt="landing " style={{margin:" 0"}}/>
    </div>
    <Footer />
  </div>
  );
};

export default Landing;
