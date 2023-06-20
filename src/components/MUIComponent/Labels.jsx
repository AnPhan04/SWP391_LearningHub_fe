import { colors } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import Button from './Button/Button';

const Labels = () => {
  const [Labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState({boardId: 1, name: '', color: '' });
  const [boardId, setBoardId] = useState(0);
  useEffect(() => {
    fetchCoreLabels();
  }, []);

  const fetchCoreLabels = async (boardId) => {
    try {
    //const response = await fetch(' http://localhost:8080/api/v1/labels');
    const response = await fetch('http://localhost:8080/api/v1/labels/getLabelsByBoardId?boardId=1');
    const data = await response.json();
    setLabels(data);
  } catch (error) {
    console.error(error);
  }
  };


  const createLabel = async () => {
    try{
    const response = await fetch(` http://localhost:8080/api/v1/labels/createBL`, {
      method: 'POST',
      credential:'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLabel),
    });
    if (response.ok) {
      // Refresh the core labels list
      fetchCoreLabels();
      // Reset the new label form
      setNewLabel({ name: '', color: '' });
    } else {
      // Handle error response
      console.error('Failed to create label:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Failed to create label:', error);
  }
  };

 

  return (
    <div style={{ border: '2px solid black', width: '300px', backgroundColor: 'lightgray'}}>
      <h2>Labels</h2>

      <form onSubmit={createLabel}>
        <label>
          Name:
          <input
            type="text"
            value={newLabel.name}
            onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
            required
          />
          
        </label>
        <br></br>
        <br></br>
        <div>
          <label htmlFor="labelColor">Color:</label>
          <input
            id="labelColor"
            type="color"
            value={newLabel.color}
            onChange={(e) => setNewLabel({ ...newLabel, color: e.target.value })}
            required
          />
        </div>
        <br></br>
        <Button type="submit">Create Label</Button>
        <br></br>
        
      </form>
      <br></br>
    </div>
  );
};

export default Labels;