const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../View')));

// Endpoint for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint for serving other HTML files
app.get('/caseoverview', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'case_overview.html'));
});

// Connect to the SQLite database
const db = new sqlite3.Database('../../joeDatabase.sqlite');

// Endpoint for fetching ongoing cases
app.get('/api/ongoing-cases', (req, res) => {
  const query = 'SELECT * FROM Cases WHERE status = "In Progress"';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

// Endpoint for fetching not started cases
app.get('/api/not-started-cases', (req, res) => {
  const query = 'SELECT * FROM Cases WHERE status = "Not Started"';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

// Endpoint for fetching approval cases
app.get('/api/approval-cases', (req, res) => {
  const query = 'SELECT * FROM Cases WHERE status = "Pending Approval"';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/cases-with-users', (req, res) => {
  const query = `
    SELECT Cases.*, Users.FirstName, Users.LastName
    FROM Cases
    LEFT JOIN CaseAssignments ON Cases.CaseID = CaseAssignments.CaseID
    LEFT JOIN Users ON CaseAssignments.UserID = Users.UserID`;
    
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});