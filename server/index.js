const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import API routes
const userRouter = require('./routes/userRouter.js');
const adminRouter = require('./routes/adminRouter.js');
// Use API routes
app.use('/api', userRouter);
app.use('/api/admin', adminRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
