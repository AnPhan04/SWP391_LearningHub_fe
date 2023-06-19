import Box from "@mui/material/Box";
import { React } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Link from "../../components/MUIComponent/Link";
import A from "../../common/assets";
import ProfileButton from "../../components/MUIComponent/ProfileButton";
import TypoText from "../../components/MUIComponent/TypoText";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import { Avatar } from "@mui/material";

const AccountSetting = () => {
  return (
    <>
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
        {/* <TypoText color={A.colors.primary} variant="h1" style={{ margin: "0" }}>
          User Avatar
        </TypoText> */}
        <Avatar alt="User default avatar" src="/img/avatar.png" style={{
          "width": "45%",
          "height": "45%",
          "margin": " 0 auto"
        }} />
        <ProfileButton style={{ marginBlock: "2em 0" }}>
          <Link href="/profile" hoverColor="white" color={A.colors.black}>
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
    </>
  );
};

export default AccountSetting;