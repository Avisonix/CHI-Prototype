const sqlhandler = require('../model/sqlhandler.js');

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async login(req, res) {
        console.log('Login request received');
        console.log(req.body);
        const { email, password } = this;
        const data = await sqlhandler(`SELECT a.*, b.role FROM users a INNER JOIN roles b ON a.fk_role = b.role_id WHERE email = ? AND valid_to = 29991231`, [email]);
        
        if (data.length === 0) {
            res.send('User not found');
        } else if (password === data[0].password) {
            res.send(data[0]);
        } else {
            res.send('Login failed');
        }
    }
    //view cases
    //missing where = valid to
    async viewCases(req, res) {
        //case_id, title, description, status, case_master(name), case_master(email), connections as nested objects
        const data = await sqlhandler(`SELECT a.case_id, a.title, a.description, b.status, c.name as case_master_name, c.email as case_master_email
        FROM cases a
        INNER JOIN case_status b ON a.fk_status = b.status_id
        INNER JOIN users c ON a.fk_case_master = c.user_id`);
        const connections = await sqlhandler(`SELECT a.case_id, b.name as connected_name, b.email as connected_email
        FROM case_connections a
        INNER JOIN users b ON a.fk_student = b.user_id`);
        const result = {
            cases: data,
            connections: connections
        };
        res.send(result);
    }
}

//admin class
class Admin extends User {
    constructor(email, password) {
        super(email, password);
    }
    //approve new case
    //req body must include title, description, max_students, case_master_id, status
    //subselect for status_id
    async approveCase(req, res) {
        //update valid_to for specific case 
        const caseId = req.body;
        const alter = sqlhandler(`UPDATE cases SET valid_to = strftime('%Y%m%d', 'now') WHERE case_id = ${caseId}`);
        //insert same case with new valid_from
        const insert = await sqlhandler(`INSERT INTO cases (title, description, max_students, valid_from, fk_case_master, fk_status) 
        values (SELECT title, description, max_students, strftime('%Y%m%d', 'now'), fk_case_master, fk_status FROM cases WHERE case_id = ${caseId}) and valid_to = strftime('%Y%m%d', 'now')`);
        console.log(alter);
        console.log(insert);
        res.send('Case failed');
    }

    async approveConnections(req, res) {
        const { case_id, user_id } = req.body;
        const insert = await sqlhandler(`INSERT INTO case_connections (fk_case, fk_student) VALUES (?, ?)`, [case_id, user_id]);
        if (insert) {
            res.send('Connection approved');
        } else {
            res.send('Connection failed');
        }
    }
}

module.exports = User; // Export the User class
