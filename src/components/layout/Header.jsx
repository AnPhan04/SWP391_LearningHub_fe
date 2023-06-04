import React, { useState } from "react";
import "./Header.css";
import Button from "../MUIComponent/Button/Button";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "../../pages/SignIn";
import Link from "../MUIComponent/Link";
import ButtonLink from "../MUIComponent/ButtonLink";
import A from "../../common/assets";
import SignUp from "../../pages/SignUp";
import AccountSetting from "../../pages/AccountSetting";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogin = () => {
    // Xử lý đăng nhập ở đây
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    setIsLoggedIn(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <BrowserRouter>
      <div className="header">
        <div className="logo">Learning Hub</div>
        <div className="menu">
          {!isLoggedIn && (
            <React.Fragment>
              <Link href="/aboutus" color={A.colors.black} style={{ marginRight: '15px' }}>
              Product
              </Link>
              <Link href="/aboutus" color={A.colors.black} style={{ marginRight: '15px' }}>
                About us
              </Link>
              <Link href="/contact" color={A.colors.black} style={{ marginRight: '15px' }}>
                Contact us
              </Link>
              <ButtonLink variant="cancel" style={{ marginRight: '15px' }} onClick={handleLogin} href="/login">
                Sign In
              </ButtonLink>
              <ButtonLink
                color={A.colors.white} style={{ marginRight: '15px' }}
                variant="button"
                onClick={() => {
                  console.info("I'm a button.");
                }}
                href="/signup"
              >
                Sign Up
              </ButtonLink>
            </React.Fragment>
          )}
          {isLoggedIn && (
            <React.Fragment>
              <Link href="/aboutus" color={A.colors.black}>
                About us
              </Link>
              <Link href="/contact" color={A.colors.black}>
                Contact us
              </Link>
              <button className="menu-item user" onClick={toggleProfile}>
                User name
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    {/* <button>Account Setting</button>
                    <button onClick={handleLogout}>Logout</button> */}
                    <ButtonLink variant="cancel" href="/accountsetting">
                      Account Setting
                    </ButtonLink>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
      <Switch>
        <Route path="/login" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/accountsetting" component={AccountSetting}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Header;
