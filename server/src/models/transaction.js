// src/models/Transaction.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const Wallet = require('./wallet');

const Transaction = sequelize.define('Transaction', {
  amount: { type: DataTypes.FLOAT },
  type: { type: DataTypes.STRING }, // loan, repayment, purchase, transfer
  status: { type: DataTypes.STRING }, // pending, completed, failed
  reference: { type: DataTypes.STRING }, // Unique ID for tracking
  providerName: { type: DataTypes.STRING, allowNull: true },
  providerReference: { type: DataTypes.STRING, allowNull: true }
});

// Link to Wallet
Wallet.hasMany(Transaction);
Transaction.belongsTo(Wallet);

module.exports = Transaction;
