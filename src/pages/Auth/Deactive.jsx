import Box from "@mui/material/Box";
import { React, useState } from "react";
import Link from "../../components/MUIComponent/Link";
import A from "../../common/assets";
import Alert from '@mui/material/Alert';
import TypoText from "../../components/MUIComponent/TypoText";
import TextField from "../../components/MUIComponent/TextField";
import Button from '@mui/material/Button';
import { Style } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Deactive = () => {
    const [pass, setPass] = useState("");
    const [err, setErr] = useState("");
    const [role, setRole] = useState("");
    const nav = useNavigate();
    const handleOnChange = (e) => {
        setPass(e.target.value);
    }
    async function logout() {
        localStorage.clear();
        await fetch("http://localhost:8080/api/v1/user/logout", {
          method: "POST",
          credentials: "include",
        }).then(response => {
          if (response.ok) {
            return (<></>)
          }
        }).catch(err => console.log(err));
      }
    const deactivateUser = async (email,pass) =>{
        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/user/?email=${email}&password=${pass}`,
                {
                    method: "DELETE",
                    credentials:"include"
                }
            );
            const json = await response.json();
            if(response.status === 500){
                setErr(json.data);
            }
            console.log(json);
        } catch (error) {
            console.log(error);
        }
    }

    const onSummitHandle = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/user/current",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const json = await response.json();

            deactivateUser(json.email,pass);
            logout();
            nav("/login");
            console.log(json);
        } catch (error) {
            console.log(error);
        }
        console.log("ref", pass);
    }
    return (
        <>
            <Box
                sx={{
                    textAlign: "center",
                    width: "30%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#eaeaea",
                    padding: "35px",
                }}
            >
                <Link href="/accountsetting" color={A.colors.black}>
                    <i class="fa-solid fa-arrow-left fa-xl"></i>
                </Link>
                <TypoText variant="h1">We sorry to see you go🥹 </TypoText>
                <TypoText variant="h5">This action is cannot be undone, please enter your password to confirm that you want to deactivate account</TypoText>
                <TextField
                    fullWidth
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleOnChange}
                />
                {err !==""&&
                    <Alert severity="error" style={{ width: "100%" }}>{err}</Alert>
                }
                <Button
                    size="large"
                    color="error"
                    style={{ marginTop: "1rem" }}
                    variant="contained"
                    onClick={() => {
                        pass !== "" && onSummitHandle()
                    }}>
                    Deactivate my account
                </Button>
                
            </Box>
        </>
    );
};

export default Deactive;