const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env')
});

const pvRoutes = require('./pvRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use(`/api`, pvRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`API available at: http://localhost:${PORT}/api`);
})