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

// Serve static files from client build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// API Routes
app.use('/api', pvRoutes);

// Catch-all route to serve the client app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
})