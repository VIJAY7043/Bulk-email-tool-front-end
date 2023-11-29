import React, { useState } from 'react';
import './App.css';

function App() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('');
  const [result, setResult] = useState('');

  const sendEmails = async () => {
    try {
      const response = await fetch('http://localhost:3001/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          message,
          recipients: recipients.split(',').map((email) => email.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Bulk Email Tool</h1>
      <div className="input-container">
        <label className='allign'>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: '300px', fontSize: '1.2em' }}
          />
        </label>
        <label className='allign'>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '300px', height: '150px', fontSize: '1.2em' }}
          />
        </label>
        <label className='allign'>
          Recipients (comma-separated):
          <input
            type="text"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            style={{ width: '300px', fontSize: '1.2em' }}
          />
        </label>
        <button onClick={sendEmails} style={{ fontSize: '1.5em', marginTop: '10px' }}>
          Send Emails
        </button>
      </div>
      <p style={{ fontSize: '1.2em', marginTop: '20px', color: '#007bff' }}>{result}</p>
    </div>
  );
}

export default App;
