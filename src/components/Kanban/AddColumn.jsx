import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import TypoText from "../../components/MUIComponent/TypoText";
import CloseIcon from "@mui/icons-material/Close";

export const Button = styled.button`
  background-color: white;
  color: white;
  margin: 5rem 0;
  width: 100%;
  flex: 0 0 2%;
  border-radius: 5px;
  background-color: gainsboro;
  font-weight: 600;
  font-size: 20px;
  padding: 5px 0;
  border: none;
`;
function AddColumn() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  console.log(name);
  const handleOnClick = () => {
    const Data = {
      // Đối tượng bạn muốn truyền trong phần body
      boardId: 1,
      name: name,
      active: true,
    };
    fetchSaveData(Data);
    setShow(false);
  };

  async function fetchSaveData(Data) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/note/column", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      const data = await response.json();
      console.log(data); // Xử lý dữ liệu API ở đây
    } catch (error) {
      console.log("Add column error: ", error);
    }
  }
  return (
    <>
      {show && (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            top: "50%",
            left: "50%",
            position: "fixed",
            transform: "translate(-50%, -50%)",
            width: "300px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CloseIcon
            sx={{
              position: "relative",
              top: "-15px",
              left: "245px",
              cursor: "pointer",
            }}
            onClick={() => setShow(false)}
          />
          <TypoText
            variant="h2"
            color="black"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            New Column
          </TypoText>
          <TextField
            fullWidth
            label="Column Name"
            id="fullWidth"
            type="text"
            sx={{
              margin: "10px 0px",
            }}
            onChange={(event) => setName(event.target.value)}
          />
          <Box>
            <button
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: "16px",
                color: "#fff",
                lineHheight: "1.2",
                textTransform: "uppercase",
                width: "100%",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 20px",
                background: "#D820FA",
                border: "none",
                borderRadius: "25px",
              }}
              onClick={handleOnClick}
            >
              save
            </button>
          </Box>
        </Box>
      )}
      <Button onClick={() => setShow(!show)}>+</Button>
    </>
  );
}
export default AddColumn;
