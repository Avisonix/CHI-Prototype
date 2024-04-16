const sqlite3 = require('sqlite3').verbose();

// Create a database file
const db = new sqlite3.Database('./model.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the lav database.');
});

// Create the user table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            gender BOOLEAN NOT NULL,
            valid_from INTEGER NOT NULL,
            valid_to INTEGER NOT NULL,
            notification BOOLEAN NOT NULL,
            fk_role INTEGER NOT NULL
        )
    `);
});
// Create the role table with the following roles: admin, student, professor, case_master, knowledge_master
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS roles (
            role_id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL
        )
    `);
});
//insert the following roles into the roles table: admin, student, professor, case_master, knowledge_master
db.serialize(() => {
    db.run(`
        INSERT INTO roles (role) VALUES ('admin')
    `);
    db.run(`
        INSERT INTO roles (role) VALUES ('student')
    `);
    db.run(`
        INSERT INTO roles (role) VALUES ('professor')
    `);
    db.run(`
        INSERT INTO roles (role) VALUES ('case_master')
    `);
    db.run(`
        INSERT INTO roles (role) VALUES ('knowledge_master')
    `);
});

// Close the database connection
db.close();