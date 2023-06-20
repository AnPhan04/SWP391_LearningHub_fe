import { Label } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import Button from './Button/Button';

const LabelsList = () => {
  const [Labels, setLabels] = useState([]);
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState(Label.boardId);
  const [editLabel, setEditLabel] = useState(null);
  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async (boardId) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/labels/getLabelsByBoardId?boardId=1');
      // const response = await fetch(`http://localhost:8080/api/v1/labels/getLabelsByBoardId?boardId=${boardId}`);
      const data = await response.json();
      setLabels(data);
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

  return (
    <div style={{ border: '2px solid black', width: '300px', backgroundColor: 'lightgray' }}>
      <h1>Labels</h1>
      {Labels.map((label) => (
        <div key={label.id} >
          {editLabel && editLabel.id === label.id ? (
            <div>
              <h3>Edit Label</h3>
              <input
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
          <input
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
              <h3 style={{ backgroundColor: label.color, width: '200px', height: '60px', borderRadius: '15px' }}>{label.name}</h3>
              <Button onClick={() => deleteLabel(label.boardId, label.id)}>Delete</Button>
              <Button onClick={() => handleEditLabel(label)} style={{ marginLeft: '10px' }}>Edit</Button>
              <p>{label.description}</p>
            </>
          )}
        </div>
      ))}
      <Button onClick={handleAddLabels}>Add Labels</Button>
      <div style={{height: '30px'}}></div>
    </div>
  );
};

export default LabelsList;