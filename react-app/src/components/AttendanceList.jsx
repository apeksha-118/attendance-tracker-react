import React, { useEffect, useState } from 'react';
 

function AttendanceList({ trigger }) {
  const [entries, setEntries] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/attendance')
      .then(res => res.json())
      .then(data => setEntries(data));
  }, [trigger]); //  run useEffect every time trigger changes

 

  return (
    <div className="p-4">
      <h2>Absent Records</h2>
      {Object.entries(entries).map(([subject, records], i) => {
        const total = records.length;
        const present = records.filter(r => r.status === 'present').length;
        const percent = ((present / total) * 100).toFixed(2);
        const absentRecords = records.filter(r => r.status === 'absent');

        return (
          <div key={i}>
            <h3>{subject} — Attendance: {percent}%</h3>
            {absentRecords.length === 0 ? (
              <p>No absences recorded </p>
            ) : (
              <ul>
                {absentRecords.map((entry, j) => (
                  <li key={j}>
                    {new Date(entry.date).toLocaleDateString()} — Absent
                    {entry.reason && ` (${entry.reason})`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AttendanceList;
