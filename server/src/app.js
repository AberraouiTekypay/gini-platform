const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./middlewares/logger');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const loanRoutes = require('./routes/loans');
const adminRoutes = require('./routes/adminRoutes');
const kycRoutes = require('./routes/kyc');
const webhookRoutes = require('./routes/webhookRoutes');
const agentRoutes = require('./routes/agentRoutes');
const walletRoutes = require('./routes/wallet');
const partnerRoutes = require('./routes/partnerRoutes');
const merchantRoutes = require('./routes/merchantRoutes');

const app = express();

// Middlewares
app.use(helmet()); // XSS and basic security headers
app.use(express.json());
app.use(cors());
app.use(logger);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/merchant', merchantRoutes);

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

module.exports = app;
