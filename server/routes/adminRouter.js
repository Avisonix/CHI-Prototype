const express = require('express');
const adminRouter = express.Router();
const {Admin} = require('../controllers/adminController.js'); // Assuming your User model is in a file named User.js

//approve case
adminRouter.put('/approveCase', async (req, res) => {
    const userId = req.body.userId;
    const admin = new Admin(userId);
    await admin.approveCase(req, res); // Call the approveCase method of the Admin class
});
module.exports = adminRouter;
