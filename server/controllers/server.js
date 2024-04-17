const express = require('express');
const app = express();
const port = 3000;

// Importer sqlite3-pakken
const sqlite3 = require('sqlite3');

// Opret forbindelse til SQLite-databasen
const db = new sqlite3.Database('../../joeDatabase.sqlite');

// Endpoint for at hente alle brugere
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users'; // Erstat med den faktiske SQL-forespørgsel
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

// Endpoint for at hente alle sager
app.get('/api/cases', (req, res) => {
  const query = 'SELECT * FROM cases'; // Erstat med den faktiske SQL-forespørgsel
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