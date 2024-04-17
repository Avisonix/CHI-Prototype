const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Login route - pass the reference to the function without invoking it
router.post('/login', userController.iLogIn);

module.exports = router;
