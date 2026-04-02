const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const loanRoutes = require('./routes/loans');

app.use('/api/loans', loanRoutes);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api/auth', authRoutes);



// Example route
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));



module.exports = app;
