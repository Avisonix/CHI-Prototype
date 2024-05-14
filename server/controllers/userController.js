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
        left JOIN case_status b ON a.fk_status = b.status_id
        left JOIN users c ON a.fk_case_master = c.user_id
        where a.valid_to = 29991231 and c.valid_to = 29991231`);
        const connections = await sqlhandler(`
        SELECT a.fk_case as case_id, b.name as connected_name, b.email as connected_email
        FROM case_connections a
        left JOIN users b ON a.fk_user = b.user_id
        left JOIN cases c ON a.fk_case = c.case_id
        where b.valid_to = 29991231 and c.valid_to = 29991231`);
        const result = {
            cases: data,
            connections: connections
        };
        res.send(result);
    }
}

module.exports = {User}; // Export the User class
