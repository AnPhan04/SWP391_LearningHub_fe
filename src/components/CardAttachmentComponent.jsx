import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const CardAttachmentComponent = ({ cardId }) => {
  const [attachment, setAttachment] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentsList, setAttachmentsList] = useState([]);

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
    setAttachmentName(e.target.files[0].name);
  };

  const handleAttachmentUrlChange = (e) => {
    setAttachmentUrl(e.target.value);
  };

  const handleAttachmentNameChange = (e) => {
    setAttachmentName(e.target.value);
  };

  const handleAddAttachment = () => {
    if (attachment) {
      const formData = new FormData();
      formData.append('cardId', cardId);
      formData.append('attachment', attachment);

      fetch('/api/v1/card-attachments/add', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAttachmentsList([...attachmentsList, data]);
          // Xử lý sau khi thêm attachment thành công
        })
        .catch((error) => {
          console.error(error);
          // Xử lý khi có lỗi
        });
    } else if (attachmentUrl) {
      // Xử lý khi thêm attachment từ URL
      const newAttachment = { id: Date.now(), name: attachmentName, url: attachmentUrl };
      setAttachmentsList([...attachmentsList, newAttachment]);
      setAttachmentUrl('');
      setAttachmentName('');
    }
  };

  const handleUpdateAttachment = (attachmentId) => {
    // fetch(`/api/v1/card-attachments/update?cardId=${cardId}&attachmentId=${attachmentId}`, {
      fetch(`/api/v1/card-attachments/update?cardId=1&attachmentId=${attachmentId}`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Attachment updated successfully');
          // Xử lý sau khi cập nhật attachment thành công
        } else if (response.status === 404) {
          console.log('Attachment not found');
          // Xử lý khi không tìm thấy attachment
        } else {
          console.log('Error updating attachment');
          // Xử lý khi có lỗi
        }
      })
      .catch((error) => {
        console.error(error);
        // Xử lý khi có lỗi
      });
  };

  const handleDeleteAttachment = (attachmentId) => {
    fetch(`/api/v1/card-attachments/delete?cardId=${cardId}&attachmentId=${attachmentId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          console.log('Attachment deleted successfully');
          setAttachmentsList(attachmentsList.filter((attachment) => attachment.id !== attachmentId));
          // Xử lý sau khi xóa attachment thành công
        } else if (response.status === 404) {
          console.log('Attachment not found');
          // Xử lý khi không tìm thấy attachment
        } else {
          console.log('Error deleting attachment');
          // Xử lý khi có lỗi
        }
      })
      .catch((error) => {
        console.error(error);
        // Xử lý khi có lỗi
      });
  };

  useEffect(() => {
    fetch(`/api/v1/card-attachments?cardId=${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAttachmentsList(data);
        // Xử lý sau khi lấy danh sách tệp đính kèm
      })
      .catch((error) => {
        console.error(error);
        // Xử lý khi có lỗi
      });
  }, [cardId]);

  return (
    <div>
      <label>
        Attachment:
        <input type="file" onChange={handleAttachmentChange} />
      </label>
      <button onClick={handleAddAttachment}>Add Attachment</button>
      <div>
        <label>
          Attachment URL:
          <input type="text" value={attachmentUrl} onChange={handleAttachmentUrlChange} />
        </label>
        <br></br>
        <br></br>
        <label>
          Attachment Name:
          <input type="text" value={attachmentName} onChange={handleAttachmentNameChange} />
        </label>
        <br></br>
        <br></br>
        <button onClick={handleAddAttachment}><DoneOutlineIcon /></button>
      </div>
      {attachmentsList.map((attachment) => (
        <div key={attachment.id}>
          {attachment.name}
          <button onClick={() => handleUpdateAttachment(attachment.id)}><EditIcon /></button>
          <button onClick={() => handleDeleteAttachment(attachment.id)}>< DeleteIcon /></button>
        </div>
      ))}
    </div>
  );
};

export default CardAttachmentComponent;
