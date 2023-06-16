import React from "react";
import styled from "styled-components";
import TextField from "../../components/MUIComponent/TextField";
import Button from "../../components/MUIComponent/Button/Button";
import TypoText from "../../components/MUIComponent/TypoText";
import SelectLabel from "../../components/MUIComponent/SelectLabel";
import DateTimePicker from "../../components/MUIComponent/DateTimePicker";


export const AddButton = styled.button`
&&&{
    background-color: white;
    color: gray;
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
        <div>
            <div>
            <TextField  id="title" label="title" name="title" />
            <SelectLabel />
            </div>
            <div>                
                </div>
            <div>
                <div>
                <DateTimePicker /> 
                <DateTimePicker />
                <TextField halfWidth id="duration" label="duration" name="duration" />
                    </div> 


            </div>

            <Button onClick={test}>+</Button>
            
            <Button variant="cancel">Cancel</Button>
        </div>

    );
}
function test() {
    alert("button pressed");
}