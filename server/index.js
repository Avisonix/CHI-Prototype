const express = require('express');
const session = require('express-session');
const app = express();

// Import API routes
const userRouter = require('/routes/userRouter.js');
// Use API routes
app.use('/api', router);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});