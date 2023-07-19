import React, { useState } from "react";
import TypoText from "../../components/MUIComponent/TypoText";
import CardInSet from "./CardInSet";
import { IconButton } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import "./CardList.css"; // Import the CSS file for styling

const CardList = ({
  counter,
  handleTermChange,
  handleDefinitionChange,
  handleDeleteCard,
}) => {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const handleTermInputChange = (event) => {
    const termValue = event.target.value;
    setTerm(termValue);
    handleTermChange(termValue, counter);
  };

  const handleDefinitionInputChange = (event) => {
    const definitionValue = event.target.value;
    setDefinition(definitionValue);
    handleDefinitionChange(definitionValue, counter);
  };

  const handleDelete = () => {
    handleDeleteCard(counter);
  };

  return (
    <div className="card-row" style={{ marginTop: "2em" }}>
      <div className="card-header">
        <TypoText style={{ margin: 0 }} variant="h4">
          {counter}
        </TypoText>
        <div className="card-icons">
          <IconButton onClick={handleDelete}>
            <DeleteOutline className="card-icon" />
          </IconButton>
        </div>
      </div>

      <div className="card-body">
        <CardInSet
          term={term}
          definition={definition}
          handleTermInputChange={handleTermInputChange}
          handleDefinitionInputChange={handleDefinitionInputChange}
        />
      </div>
    </div>
  );
};

export default CardList;
