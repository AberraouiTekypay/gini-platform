// src/models/Transaction.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const Wallet = require('./wallet');

const Transaction = sequelize.define('Transaction', {
  amount: { type: DataTypes.FLOAT },
  type: { type: DataTypes.STRING }, // loan, repayment, purchase, transfer
  status: { 
    type: DataTypes.ENUM('INITIATED', 'PENDING_PARTNER', 'SETTLED', 'FAILED', 'REVERSED'), 
    defaultValue: 'INITIATED' 
  },
  reference: { type: DataTypes.STRING }, // Unique ID for tracking
  providerName: { type: DataTypes.STRING, allowNull: true },
  providerReference: { type: DataTypes.STRING, allowNull: true },
  fraudAlert: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Link to Wallet
Wallet.hasMany(Transaction);
Transaction.belongsTo(Wallet);

module.exports = Transaction;
