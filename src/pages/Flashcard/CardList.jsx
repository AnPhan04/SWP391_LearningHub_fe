import React, { useState } from "react";
import TypoText from "../../components/MUIComponent/TypoText";
import CardInSet from "./CardInSet";

const CardList = ({ counter, handleTermChange, handleDefinitionChange }) => {
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

  return (
    <div className="card-row" style={{ marginTop: "2em" }}>
      <div className="card-header">
        <TypoText style={{ margin: 0 }} variant="h4">
          {counter}
        </TypoText>
        <div className="card-icons">
          <i className="fa-solid fa-pen-to-square"></i>
          <i className="card-icon fa-solid fa-trash"></i>
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
