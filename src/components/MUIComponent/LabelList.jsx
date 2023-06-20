import { Label } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import Button from './Button/Button';
import Input from './Input';
import TypoText from './TypoText';
import Labels from './Labels';
const LabelsList = () => {
  const [labelsList, setLabelsList] = useState([]);
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState(Label.boardId);
  const [editLabel, setEditLabel] = useState(null);
  const [showLabels, setShowLabels] = useState(false);
  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async (boardId) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/labels/getLabelsByBoardId?boardId=1');
      // const response = await fetch(`http://localhost:8080/api/v1/labels/getLabelsByBoardId?boardId=${boardId}`);
      const data = await response.json();
      setLabelsList(data);
    } catch (error) {
      console.log('Error fetching core labels:', error);
    }
  };

  const handleAddLabels = () => {
    navigate('/addlabel');
  };

  const deleteLabel = async (boardId, labelId) => {
    try {
    const response = await fetch(` http://localhost:8080/api/v1/labels/deleBL?boardId=${boardId}&labelId=${labelId}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      fetchLabels();
    } else {
      console.error('Failed to delete label.');
    }
  } catch (error) {
    console.error(error);
  }
  };

  const handleEditLabel = (label) => {
    setEditLabel(label);
  };

  const handleSaveLabel = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/labels/updateBL?boardId=${editLabel.boardId}&labelId=${editLabel.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editLabel),
        }
      );
      if (response.status === 200) {
        fetchLabels();
        setEditLabel(null);
      } else {
        console.error('Failed to update label.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditLabel(null);
  };

  const handleShowLabels = () => {
    setShowLabels(true);
  };

  const handleHideLabels = () => {
    setShowLabels(false);
  };

  return (
    <div style={{width: '350px'}}>
      <h1>Labels</h1>
      {labelsList.map((label) => (
        <div key={label.id} >
          {editLabel && editLabel.id === label.id ? (
            <div>
              <h3>Edit Label</h3>
              <Input
                type="text"
                value={editLabel.name}
                onChange={(e) =>
                  setEditLabel((prevLabel) => ({
                    ...prevLabel,
                    name: e.target.value,
                  }))
                }
              />
              <br></br>
              <br></br>
              <label htmlFor="labelColor">Color:</label>
          <Input
            id="labelColor"
            type="color"
            value={editLabel.color}
            onChange={(e) => setEditLabel((prevLabel) => ({
              ...prevLabel, color: e.target.value,
            }))}
            required
          />
              {/* Add more input fields for other properties */}
              <br></br>
              <Button onClick={handleSaveLabel}>Save</Button>
              <Button onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</Button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center'}}>
              <h3 style={{ backgroundColor: label.color,width: '200px', height: '60px'}}>{label.name}</h3>
              <Button onClick={() => deleteLabel(label.boardId, label.id)} style={{ marginLeft: '10px' }}>Delete</Button>
              <Button onClick={() => handleEditLabel(label)} style={{ marginLeft: '10px' }}>Edit</Button>
              </div>
            </>
          )}
        </div>
      ))}
      {/* <Button onClick={handleAddLabels}>Add Labels</Button> */}
      <Button onClick={handleShowLabels}>Add Labels</Button>
      {showLabels && <Labels />}
      <div style={{height: '30px'}}></div>
    </div>
  );
};

export default LabelsList;