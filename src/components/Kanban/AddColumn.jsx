import React from "react";
import styled from "styled-components";

export const  Button= styled.button`
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
export default function AddColumn(){

    return(
        <Button onClick={test}>+</Button>
    );
}
function test(){
    alert("button pressed");
}