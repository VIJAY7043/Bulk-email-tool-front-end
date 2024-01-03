import React, { useState } from 'react';
import './App.css';

function App() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const sendEmails = async () => {
    try {
      setButtonClicked(true);

      // Basic form validation
      if (!subject || !message || !recipients) {
        setResult('Please fill in all fields.');
        setButtonClicked(false);
        return;
      }

      const response = await fetch('YOUR_BACKEND_API_URL/send-emails', {
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
    } finally {
      setLoading(false);
      setButtonClicked(false);
    }
  };

  return (
    <div className={`App ${buttonClicked ? 'button-clicked' : ''}`}>
      <h1>Bulk Email Tool</h1>
      <div className="input-container">
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <label>
          Recipients (comma-separated):
          <input
            type="text"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />
        </label>
        <button onClick={sendEmails} disabled={loading}>
          {loading ? 'Sending...' : 'Send Emails'}
        </button>
      </div>
      <p>{result}</p>
    </div>
  );
}

export default App;
