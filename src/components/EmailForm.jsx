import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      to,
      subject,
      content,
    };

    try {
      await axios.post('/api/email/send', data);
      alert('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="to">To:</label>
      <input
        type="email"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
      /><br /><br />

      <label htmlFor="subject">Subject:</label>
      <input
        type="text"
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      /><br /><br />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea><br /><br />

      <button type="submit">Send</button>
    </form>
  );
};

export default EmailForm;
