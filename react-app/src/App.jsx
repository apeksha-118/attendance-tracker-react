import React, { useState } from 'react';
import AttendanceForm from './components/AttendanceForm';
import AttendanceList from './components/AttendanceList';
import './index.css';

function App() {
  const [updateTrigger, setUpdateTrigger] = useState(0); //  triggers AttendanceList refresh

  const handleFormSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setUpdateTrigger(prev => prev + 1); //  trigger refresh
      }
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const handleClearAll = async () => {
    const confirmDelete = window.confirm("Are you sure you want to clear ALL attendance records?");
    if (!confirmDelete) return;

    try {
      const res = await fetch('http://localhost:5000/clear', {
        method: 'DELETE'
      });

      if (res.ok) {
        setUpdateTrigger(prev => prev + 1); //  trigger refresh
      }
    } catch (err) {
      console.error('Failed to clear:', err);
    }
  };

  return (
    <div className="container">
      <h1>📚 Attendance Tracker</h1>
      <AttendanceForm onSubmit={handleFormSubmit} />

      <button
        onClick={handleClearAll}
        style={{
          backgroundColor: '#ff5555',
          color: 'white',
          padding: '10px',
          margin: '16px 0',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
         Clear All Attendance Records
      </button>

      <AttendanceList trigger={updateTrigger} />
    </div>
  );
}

export default App;
