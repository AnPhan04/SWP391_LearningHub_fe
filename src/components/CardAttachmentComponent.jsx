import React, { useState } from 'react';
import axios from 'axios';

const CardAttachmentComponent = () => {
  const [cardId, setCardId] = useState('');
  const [attachment, setAttachment] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAttachment = async () => {
    try {
      const response = await axios.post('/api/v1/card-attachments/add', {
        cardId: cardId,
        attachment: attachment
      });
      setMessage('Attachment added successfully.');
      // Reset form fields if needed
      setCardId('');
      setAttachment('');
    } catch (error) {
      setMessage('Error adding attachment.');
      console.error(error);
    }
  };

  const handleUpdateAttachment = async () => {
    try {
      const response = await axios.put('/api/v1/card-attachments/update', {
        cardId: cardId,
        attachment: attachment
      });
      setMessage('Attachment updated successfully.');
      // Reset form fields if needed
      setCardId('');
      setAttachment('');
    } catch (error) {
      setMessage('Error updating attachment.');
      console.error(error);
    }
  };

  const handleDeleteAttachment = async () => {
    try {
      const response = await axios.delete('/api/v1/card-attachments/delete', {
        params: { cardId: cardId }
      });
      setMessage('Attachment deleted successfully.');
      // Reset form fields if needed
      setCardId('');
      setAttachment('');
    } catch (error) {
      setMessage('Error deleting attachment.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Card Attachment</h2>
      <div>
        <label>Card ID:</label>
        <input type="text" value={cardId} onChange={(e) => setCardId(e.target.value)} />
      </div>
      <div>
        <label>Attachment:</label>
        <input type="text" value={attachment} onChange={(e) => setAttachment(e.target.value)} />
      </div>
      <div>
        <button onClick={handleAddAttachment}>Add Attachment</button>
        <button onClick={handleUpdateAttachment}>Update Attachment</button>
        <button onClick={handleDeleteAttachment}>Delete Attachment</button>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default CardAttachmentComponent;
