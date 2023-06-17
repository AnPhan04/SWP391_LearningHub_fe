import React, { useEffect, useState } from 'react';

const LabelList = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách nhãn dán từ backend
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    try {
      const response = await fetch('/api/labels'); // Thay đổi URL tương ứng với API của bạn
      const data = await response.json();
      setLabels(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Label Management</h1>
      <ul>
        {labels.map((label) => (
          <li key={label.id}>
            <span>{label.name}</span>
            <span>{label.color}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabelList;