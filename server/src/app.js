const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const loanRoutes = require('./routes/loans');
const adminRoutes = require('./routes/adminRoutes');
const kycRoutes = require('./routes/kyc');
const webhookRoutes = require('./routes/webhookRoutes');
const agentRoutes = require('./routes/agentRoutes');
const walletRoutes = require('./routes/wallet');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/wallet', walletRoutes);

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

module.exports = app;
