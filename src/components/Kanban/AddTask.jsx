import React from "react";
import styled from "styled-components";

export const AddButton = styled.button`
&&&{
    background-color: #e3e3e3;
    color: white;
    margin-top: 15px;
    // padding: 15px 20px;
    font-weight: 600;
    font-size: 20px;
    padding: 5px 0;
    border: none;
}
`;
export default function AddTask() {

    return (
        <AddButton onClick={test}>+</AddButton>
    );
}
function test() {
    alert("button pressed");
}