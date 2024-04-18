const express = require('express');
const router = express.Router();
const User = require('../controllers/userController.js'); // Assuming your User model is in a file named User.js

// POST route for login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    await user.login(req, res); // Call the login method of the User class
});

module.exports = router;
