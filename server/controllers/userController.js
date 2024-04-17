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
        const user = await sqlhandler(`SELECT * FROM users WHERE email = ?`, [this.email]);
        //check if the user exists
        if (user.length === 0) {
            return 'User not found';
        }
        //compare the password
        if (this.password === user[0].password) {
            return 'Login successful';
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

