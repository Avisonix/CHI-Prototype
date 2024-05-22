const express = require('express');
const userRouter = express.Router();
const {User} = require('../controllers/userController.js'); // Assuming your User model is in a file named User.js

// POST route for login
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    await user.login(req, res); // Call the login method of the User class
});
// GET route for viewCases
userRouter.get('/viewCases', async (req, res) => {
    const user = new User();
    await user.viewCases(req, res); // Call the viewCases method of the User class
});
module.exports = userRouter;
