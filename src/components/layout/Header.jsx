import React, { useEffect, useState } from "react";
import "./Header.css";
import Button from "../MUIComponent/Button/Button";
import { Route, Link as RouterLink, Routes } from "react-router-dom";
import SignIn from "../../pages/Auth/SignIn";
import Link from "../MUIComponent/Link";
import ButtonLink from "../MUIComponent/ButtonLink";
import A from "../../common/assets";
import SignUp from "../../pages/Auth/SignUp";
import AccountSetting from "../../pages/User/AccountSetting";
import Landing from "../../pages/Landing";

async function logout() {
  await fetch("http://localhost:8080/api/v1/user/logout", {
    method: "POST",
    credentials: "include",
  }).then(response => {
    if (response.ok) {
      return (<></>)
    }
  }).catch(err => console.log(err));
}

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("Guest");
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/user/current", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLogged(json.active);
        console.log(logged);
        setUsername(json.email.substring(0, json.email.indexOf('@')));
        console.log(username)
      })
      .catch((error) => setLogged(false));
  }, [logged, username])
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
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
            <>
              <Link
                href="/aboutus"
                color={A.colors.white}
                style={{ marginRight: "15px" }}
              >
                Product
              </Link>
              <Link
                href="/aboutus"
                color={A.colors.white}
                style={{ marginRight: "15px" }}
              >
                About us
              </Link>
              <Link
                href="/contact"
                color={A.colors.white}
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
                variant="cancel"
                href="/signup"
              >
                Sign Up
              </ButtonLink>
            </>
          )}
          {logged && (
            <>
              <Link href="/contact" color={A.colors.white} style={{ marginRight: "15px" }}>
                Contact us
              </Link>
              <button className="menu-item user" onClick={toggleProfile}>
                {"Hi " + username}
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    {/* <button>Account Setting</button>
                    <button onClick={handleLogout}>Logout</button> */}
                    <button href="/aboutus" color={A.colors.white}>
                      User Profile
                    </button>

                    <button variant="cancel" href="/accountsetting">
                      Account Setting
                    </button>
                    <Link href="/landing">
                      <button variant="cancel" onClick={() => { logout(); setLogged(false) }} >
                        Logout
                      </button>
                    </Link>
                  </div>
                )}
              </button>
            </>
          )}
        </div>
      </div>

    </>
  );
};

export default Header;
