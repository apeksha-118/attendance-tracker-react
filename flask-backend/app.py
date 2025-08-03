
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('attendance.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS records
                 (id INTEGER PRIMARY KEY, subject TEXT, date TEXT, status TEXT, reason TEXT)''')
    conn.commit()
    conn.close()

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    subject = data.get('subject', '').strip().upper()
    date = data.get('date', '').strip()
    status = data.get('status', '').strip()
    reason = data.get('reason', '').strip()

    conn = sqlite3.connect('attendance.db')
    c = conn.cursor()
    c.execute("INSERT INTO records (subject, date, status, reason) VALUES (?, ?, ?, ?)",
              (subject, date, status, reason))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Saved'}), 200

@app.route('/attendance', methods=['GET'])
def attendance():
    conn = sqlite3.connect('attendance.db')
    c = conn.cursor()
    c.execute("SELECT subject, date, status, reason FROM records")
    rows = c.fetchall()
    conn.close()

    grouped = {}
    for subject, date, status, reason in rows:
        grouped.setdefault(subject, []).append({
            'date': date,
            'status': status,
            'reason': reason
        })
    return jsonify(grouped)

@app.route('/clear', methods=['DELETE'])
def clear_all():
    conn = sqlite3.connect('attendance.db')
    c = conn.cursor()
    c.execute("DELETE FROM records")
    conn.commit()
    conn.close()
    return jsonify({'message': 'All records cleared'}), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
