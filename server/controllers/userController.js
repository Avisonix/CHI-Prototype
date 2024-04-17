const sqlhandler = require('../model/sqlhandler.js');

//login in object oriented way using a class 
class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    //login a user
    async login() {
        //get the user from the database
        const data = await sqlhandler(`SELECT a.*, b.role FROM users a inner join roles b on a.fk_role = b.role_id WHERE email = ? and valid_to = 29991231`, [this.email]);
        //check if the user exists
        if (data.length === 0) {
            return 'User not found';
        }
        //compare the password
        if (this.password === data[0].password) {
            return data[0];
        } else {
            return 'Login failed';
        }
    }
}

const iLogIn = async (req, res) => {
    console.log('Login request received');
    console.log(req.body);
    const { email, password } = req.body;
    const user = new User(email, password);
    const result = await user.login();
    res.send(result);
};

// Export the login function
module.exports = { iLogIn };

