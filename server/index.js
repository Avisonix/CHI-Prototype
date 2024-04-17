const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import API routes
const userRouter = require('./routes/userRouter.js');
// Use API routes
app.use('/api', userRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
