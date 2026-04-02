// src/models/Wallet.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = require('./user');

const Wallet = sequelize.define('Wallet', {
  balance: { type: DataTypes.FLOAT, defaultValue: 0 },
  currency: { type: DataTypes.STRING, defaultValue: 'USD' },
  label: { type: DataTypes.STRING, defaultValue: 'USER_WALLET' } // USER_WALLET, GINI_REVENUE, GINI_MARKETING
});

// One-to-one relationship with User
User.hasOne(Wallet);
Wallet.belongsTo(User);

module.exports = Wallet;
