import Box from "@mui/material/Box";
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Link from "../components/MUIComponent/Link";
import A from "../common/assets";
import ProfileButton from "../components/MUIComponent/ProfileButton";
import TypoText from "../components/MUIComponent/TypoText";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

const AccountSetting = () => {
  return (
    <BrowserRouter>
      <Box
        component="form"
        noValidate
        sx={{
          width: "25rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#eaeaea",
          padding: "35px",
        }}
      >
        {/* reuse the component from header */}
        <TypoText color={A.colors.primary} variant="h1" style={{ margin: "0" }}>
          User Avatar
        </TypoText>

        <ProfileButton style={{ marginBlock: "2em 0" }}>
          <Link href="/editprofile" hoverColor="white" color={A.colors.black}>
            Edit Profile
          </Link>
        </ProfileButton>
        <ProfileButton>
          <Link href="/changepw" hoverColor="white" color={A.colors.black}>
            Change Password
          </Link>
        </ProfileButton>
        <ProfileButton style={{ marginBlockEnd: "2em" }}>
          <Link href="/deactive" hoverColor="white" color={A.colors.black}>
            Deactive
          </Link>
        </ProfileButton>
      </Box>

      <Switch>
        <Route exact path="/editprofile" component={EditProfile}></Route>
        <Route path="/changepw" component={ChangePassword}></Route>

        {/* Need to confirm next screen of this function */}
        <Route path="/deactive"></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AccountSetting;