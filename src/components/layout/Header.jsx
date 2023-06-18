import React, { useState } from "react";
import "./Header.css";
import Button from "../MUIComponent/Button/Button";
import {
  BrowserRouter,
  Router,
  // useNavigate,
  Route,
  Link as RouterLink,
  Routes,
} from "react-router-dom";
import SignIn from "../../pages/Auth/SignIn";
import Link from "../MUIComponent/Link";
import ButtonLink from "../MUIComponent/ButtonLink";
import A from "../../common/assets";
import SignUp from "../../pages/Auth/SignUp";
import AccountSetting from "../../pages/User/AccountSetting";
import UserDashBoard from "../../pages/User/UserDashboard";

const CustomLink = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink to={href} ref={ref} {...other} />;
});

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  fetch("http://localhost:8080/api/v1/user/current", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      setLogged(json.active)
    })
    .catch((error) => setLogged(false));

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  async function logout() {
    await fetch("http://localhost:8080/api/v1/user/logout", {
      method: "POST",
      credentials: "include",
    }).then(response => {
      if (response.ok) {
        return (
          <Routes>
            <Route path="/" element={<UserDashBoard />} />;
          </Routes>
        );
      }
    }).catch(err => console.log(err));
  }
  return (
    <>
      <div className="header">
        <div className="logo">
          <Link href="/" color={A.colors.white}>
            Learning Hub
          </Link>
        </div>
        <div className="menu">
          {!logged && (
            <React.Fragment>
              <Link
                href="/aboutus"
                color={A.colors.black}
                style={{ marginRight: "15px" }}
              >
                Product
              </Link>
              <Link
                href="/aboutus"
                color={A.colors.black}
                style={{ marginRight: "15px" }}
              >
                About us
              </Link>
              <Link
                href="/contact"
                color={A.colors.black}
                style={{ marginRight: "15px" }}
              >
                Contact us
              </Link>
              <ButtonLink
                style={{ marginRight: "15px" }}
                href="/login"
                variant="cancel"
              >
                Sign In
              </ButtonLink>
              <ButtonLink
                color={A.colors.white}
                style={{ marginRight: "15px" }}
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
          {logged && (
            <React.Fragment>
              <Link href="/aboutus" color={A.colors.black}>
                User Profile
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
                    <button onClick={()=>{logout()}}>Logout</button>
                  </div>
                )}
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={SignUp}></Route>
        <Route path="/accountsetting" element={AccountSetting}></Route>
      </Routes>
    </>
  );
};

export default Header;
