const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' 
    ? path.resolve(__dirname, '.env.production')
    : path.resolve(__dirname, '.env')
});

const pvRoutes = require('./pvRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define the base path
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/stemday' : '';

// Serve static files from client build in production
if (process.env.NODE_ENV === 'production') {
  // The main static files are served by the web server from /var/www/html/moodle/stemday
  // This is a fallback for direct Express server access
  app.use(`${BASE_PATH}`, express.static(path.join(__dirname, '../client/dist')));
}

// API Routes - in production these will be available at /stemday/api
app.use(`${BASE_PATH}/api`, pvRoutes);

// CORS configuration for production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.BASE_URL || 'http://remoodle.fun');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
}

// Catch-all route to serve the client app in production
if (process.env.NODE_ENV === 'production') {
  app.get(`${BASE_PATH}/*`, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`API available at: ${process.env.NODE_ENV === 'production' ? 'http://remoodle.fun/stemday/api' : `http://localhost:${PORT}/api`}`);
})