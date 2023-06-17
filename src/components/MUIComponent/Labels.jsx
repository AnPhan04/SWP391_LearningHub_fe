import { colors } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';

const Labels = () => {
  const [coreLabels, setCoreLabels] = useState([]);
  const [newLabel, setNewLabel] = useState({ name: '', color: '' });

  useEffect(() => {
    fetchCoreLabels();
  }, []);

  const fetchCoreLabels = async () => {
    const response = await fetch('/api/v1/labels');
    const data = await response.json();
    setCoreLabels(data);
  };

  const deleteLabel = async (labelId) => {
    const response = await fetch(`/api/v1/labels/${labelId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Label deleted successfully, update the UI
      fetchCoreLabels();
    }
  };

  const createLabel = async () => {
    const response = await fetch('/api/v1/labels', {
      method: 'POST',
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
    }
  };

  const handleDragStart = (e, labelId) => {
    e.dataTransfer.setData('labelId', labelId);
  };

  const handleDrop = (e) => {
    const labelId = e.dataTransfer.getData('labelId');
    const cardId = // Get the card ID where the label is dropped
    addLabelToCard(cardId, labelId);
  };

  const addLabelToCard = async (cardId, labelId) => {
    const response = await fetch(`/api/v1/labels/cards/${cardId}/labels/${labelId}`, {
      method: 'POST',
    });
    if (response.ok) {
      // Label added to card successfully, update the UI
    }
  };

  const removeLabelFromCard = async (cardId, labelId) => {
    const response = await fetch(`/api/v1/labels/cards/${cardId}/labels/${labelId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Label removed from card successfully, update the UI
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
        <button type="submit">Create Label</button>
        <br></br>
        
      </form>
      <br></br>
    </div>
  );
};

export default Labels;