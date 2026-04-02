// src/models/Card.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const Wallet = require('./wallet');

const Card = sequelize.define('Card', {
  cardNumber: { type: DataTypes.STRING }, // Encrypted field
  expiry: { type: DataTypes.STRING },
  cvv: { type: DataTypes.STRING }, // Encrypted field
  status: { type: DataTypes.STRING, defaultValue: 'active' } // active, frozen, closed
});

// Link to Wallet
Wallet.hasMany(Card);
Card.belongsTo(Wallet);

module.exports = Card;
