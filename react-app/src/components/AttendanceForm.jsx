import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AttendanceForm({ onSubmit }) {
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState('present');
  const [reason, setReason] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) {
      alert("Please enter a subject name.");
      return;
    }
    onSubmit({ date, status, reason, subject: subject.trim().toUpperCase() });
    setReason('');
    setSubject('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
      <div>
        <label><strong>Date:</strong></label><br />
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div>
        <label><strong>Subject:</strong></label><br />
        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ width: '200px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
      </div>

      <div>
        <label><strong>Status:</strong></label><br />
        <label style={{ marginRight: '12px' }}>
          <input
            type="radio"
            value="present"
            checked={status === 'present'}
            onChange={(e) => setStatus(e.target.value)}
          /> Present
        </label>
        <label>
          <input
            type="radio"
            value="absent"
            checked={status === 'absent'}
            onChange={(e) => setStatus(e.target.value)}
          /> Absent
        </label>
      </div>

      <div>
        <label><strong>Reason (if absent):</strong></label><br />
        <input
          type="text"
          placeholder="Optional reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={status === 'present'}
          style={{ width: '300px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <button type="submit" style={{
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: 'fit-content'
      }}>
        Submit
      </button>
    </form>
  );
}

export default AttendanceForm;
