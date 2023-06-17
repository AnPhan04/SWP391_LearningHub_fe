import React, { useState } from "react";
import "./Header.css";
import Button from "../MUIComponent/Button/Button";
import {Route,Link as RouterLink,Routes,redirect} from "react-router-dom";
import SignIn from "../../pages/Auth/SignIn";
import Link from "../MUIComponent/Link";
import ButtonLink from "../MUIComponent/ButtonLink";
import A from "../../common/assets";
import SignUp from "../../pages/Auth/SignUp";
import AccountSetting from "../../pages/User/AccountSetting";
import { MenuList } from "@mui/material";

const CustomLink = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink to={href} ref={ref} {...other} />;
});

async function logout() {
  fetch("http://localhost:8080/api/v1/user/logout", {
    method: "POST",
    credentials: "include",
  }).then(redirect('/')).catch(err => console.log(err))
}
const Nav = (props) => {
  {console.log(props.logged)}
  if (!props.logged) {
    return (
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
    );
  } else {
    return (
        <React.Fragment>
          <Link href="/aboutus" color={A.colors.black}>
            User Profile
          </Link>
          <Link href="/contact" color={A.colors.black}>
            Contact us
          </Link>
          <button className="menu-item user" onClick={MenuList}>
            User name
            <div className="profile-dropdown">
              <button>Account Setting</button>
              <button onClick={logout()}>Logout</button>
              <ButtonLink variant="cancel" href="/accountsetting">
                Account Setting
              </ButtonLink>
              <button onClick={logout()}>Logout</button>
            </div>
          </button>
        </React.Fragment>
    );
  }
}
const Header = (props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
          <Nav logged={props.logged} />
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/accountsetting" element={<AccountSetting />}></Route>
      </Routes>
    </>
  );
};

export default Header;
