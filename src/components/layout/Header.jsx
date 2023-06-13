import React, { useState } from "react";
import "./Header.css";
import Button from "../MUIComponent/Button/Button";
import {
  BrowserRouter,
<<<<<<< HEAD
  Switch,
  Route,
  Link as RouterLink,
  useHistory,
=======
  Router,
  useNavigate,
  Route,
  Link as RouterLink,
  Routes,
>>>>>>> 2ef6af3c2d2fe1a00a94b39f1dba873e98e9346c
} from "react-router-dom";
import SignIn from "../../pages/SignIn";
import Link from "../MUIComponent/Link";
import ButtonLink from "../MUIComponent/ButtonLink";
import A from "../../common/assets";
import SignUp from "../../pages/SignUp";
import AccountSetting from "../../pages/AccountSetting";

<<<<<<< HEAD
=======


>>>>>>> 2ef6af3c2d2fe1a00a94b39f1dba873e98e9346c
const CustomLink = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink to={href} ref={ref} {...other} />;
});

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
<<<<<<< HEAD
  const history = useHistory();

  const handleLogin = () => {
    setIsLoggedIn(true);
    history.push("/");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
=======
  const [logged, setLogged] = useState(false);
  const nav = useNavigate();
  try {
    nav("/");
  } catch (error) {
    console.log(error.message);
  }
>>>>>>> 2ef6af3c2d2fe1a00a94b39f1dba873e98e9346c

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <div className="header">
        <div className="logo">Learning Hub</div>
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
<<<<<<< HEAD
                variant="cancel"
                style={{ marginRight: "15px" }}
                onClick={handleLogin}
=======
                style={{ marginRight: "15px" }}
>>>>>>> 2ef6af3c2d2fe1a00a94b39f1dba873e98e9346c
                href="/login"
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
                    <button>Logout</button>
                  </div>
                )}
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
<<<<<<< HEAD
      <Switch>
        <Route path="/login">
          <SignIn handleLogin={handleLogin} />
        </Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/accountsetting" component={AccountSetting}></Route>
      </Switch>
    </BrowserRouter>
=======
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={SignUp}></Route>
        <Route path="/accountsetting" element={AccountSetting}></Route>
      </Routes>
    </>
>>>>>>> 2ef6af3c2d2fe1a00a94b39f1dba873e98e9346c
  );
};

export default Header;
