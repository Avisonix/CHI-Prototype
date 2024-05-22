const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sti til mappen med HTML-filer
const htmlPath = path.join(__dirname, '../frontend_pages/View');

// Brug express.static middleware til at servere HTML-filer fra den angivne mappe
app.use(express.static(htmlPath));

// Sti til mappen med JavaScript-filer
const scriptsPath = path.join(__dirname, '../frontend_pages/scripts');

// Brug express.static middleware til at servere JavaScript-filer fra den angivne mappe
app.use('/scripts', express.static(scriptsPath, {
  setHeaders: (res, filePath) => {
    if (path.extname(filePath) === '.js') {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Import API-routes
const userRouter = require('./routes/userRouter.js');
const adminRouter = require('./routes/adminRouter.js');

// Brug API-ruter
app.use('/api', userRouter);
app.use('/api/admin', adminRouter);

// Start serveren
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});