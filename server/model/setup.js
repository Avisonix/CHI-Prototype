const sqlite3 = require('sqlite3').verbose();

// Create a database file
const db = new sqlite3.Database('./server/model/model.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the lav database.');
});

// Create the user table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            gender BOOLEAN NOT NULL,
            valid_from INTEGER NOT NULL,
            valid_to INTEGER NOT NULL,
            notification BOOLEAN NOT NULL,
            fk_role INTEGER NOT NULL,
            FOREIGN KEY (fk_role) REFERENCES roles(role_id) ON DELETE CASCADE
        )
    `);
});

// Create the roles table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS roles (  
            role_id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL
        )
    `);
});

// Insert the following roles into the roles table
const roles = ['admin', 'student', 'professor', 'case_master', 'knowledge_master'];
roles.forEach(role => {
    db.run(`
        INSERT INTO roles (role) VALUES (?)`, [role], function(err) {
            if (err) {
                console.error(err.message);
            }
        });
});

// Create the case table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS cases (
            case_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            max_students INTEGER NOT NULL,
            valid_from INTEGER NOT NULL,
            valid_to INTEGER NOT NULL,
            fk_case_master INTEGER NOT NULL,
            fk_status INTEGER NOT NULL,
            FOREIGN KEY (fk_case_master) REFERENCES users(user_id) ON DELETE CASCADE
            FOREIGN KEY (fk_status) REFERENCES case_status(status_id) ON DELETE CASCADE
        )
    `);
});

// Create the case_status table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS case_status (
            status_id INTEGER PRIMARY KEY AUTOINCREMENT,
            status TEXT NOT NULL
        )
    `);
});
/*
//insert into case_status table the following statuses "Not Started", "Pending Approval", "In Progress"
db.serialize(() => {
    db.run(`
        INSERT INTO case_status (status) VALUES ('Not Started'), ('Pending Approval'), ('In Progress')`, function(err) {
            if (err) {
                console.error(err.message);
            }
        });
}
);
*/

// Create the case_connection table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS case_connections (
            case_connection_id INTEGER PRIMARY KEY AUTOINCREMENT,
            fk_case INTEGER NOT NULL,
            fk_user INTEGER NOT NULL,
            FOREIGN KEY (fk_case) REFERENCES cases(case_id) ON DELETE CASCADE,
            FOREIGN KEY (fk_user) REFERENCES users(user_id) ON DELETE CASCADE
        )
    `);
});

// Create the interests table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS interests (
            interest_id INTEGER PRIMARY KEY AUTOINCREMENT,
            interest TEXT NOT NULL
        )
    `);
});


// Create the courses table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS courses (
            course_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            number_of_students INTEGER NOT NULL,
            valid_from INTEGER NOT NULL,
            valid_to INTEGER NOT NULL,
            fk_professor INTEGER NOT NULL,
            FOREIGN KEY (fk_professor) REFERENCES users(user_id) ON DELETE CASCADE
        )
    `);
});

// Create the course_case table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS course_cases (
            course_case_id INTEGER PRIMARY KEY AUTOINCREMENT,
            fk_course INTEGER NOT NULL,
            fk_case INTEGER NOT NULL,
            FOREIGN KEY (fk_course) REFERENCES courses(course_id) ON DELETE CASCADE,
            FOREIGN KEY (fk_case) REFERENCES cases(case_id) ON DELETE CASCADE
        )
    `);
});

// Create threads table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS threads (
            thread_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            original_question TEXT NOT NULL,
            valid_from INTEGER NOT NULL,
            valid_to INTEGER NOT NULL,
            fk_user INTEGER NOT NULL,
            FOREIGN KEY (fk_user) REFERENCES users(user_id) ON DELETE CASCADE
        )
    `);
});

// Create the thread_comments table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS thread_comments (
            comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            fk_thread INTEGER NOT NULL,
            fk_user INTEGER NOT NULL,
            comment TEXT NOT NULL,
            FOREIGN KEY (fk_thread) REFERENCES threads(thread_id) ON DELETE CASCADE,
            FOREIGN KEY (fk_user) REFERENCES users(user_id) ON DELETE CASCADE
        )
    `);
});

//create mock case
db.serialize(() => {
    db.run(`
        INSERT INTO cases (title, description, max_students, valid_from, valid_to, fk_case_master, fk_status) VALUES ('Mock Case', 'This is a mock case', 5, strftime('%Y%m%d', 'now'), '29991231', 1, 1)`, function(err) {
            if (err) {
                console.error(err.message);
            }
        });
});
/*
//create mock user with fk_role = 4
db.serialize(() => {
    db.run(`
        INSERT INTO users (name, email, password, gender, valid_from, valid_to, notification, fk_role) 
        VALUES ('Mr. Case Master', 'caseMaster@testmail.com', 'password123', 1, strftime('%Y%m%d', 'now'), '29991231', 1, 4)
    `);
});

//create mock case

db.serialize(() => {
    db.run(`
        INSERT INTO cases (title, description, max_students, valid_from, valid_to, fk_case_master, fk_status) VALUES ('Mock Case', 'This is a mock case', 5, strftime('%Y%m%d', 'now'), '29991231', 2, 1)`, function(err) {
            if (err) {
                console.error(err.message);
            }
        });
});*/
// Close the database connection
db.close();
