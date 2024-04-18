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
    async viewCases(req, res) {
        console.log('View cases request received');
        const data = await sqlhandler(`SELECT * FROM cases innerjoin case_master on cases.fk_case_master = case_master.case_master_id`);
        res.send(data);
    }

    //view courses

    //view threads
}

//admin class
class Admin extends User {
    constructor(email, password) {
        super(email, password);
    }

    //view users
}

module.exports = User; // Export the User class
