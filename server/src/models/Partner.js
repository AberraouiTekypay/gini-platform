// server/src/models/Partner.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Partner = sequelize.define('Partner', {
  name: { type: DataTypes.STRING, allowNull: false },
  type: { 
    type: DataTypes.ENUM('CONVENTIONAL', 'PARTICIPATIVE'), 
    allowNull: false 
  },
  country: { type: DataTypes.STRING, defaultValue: 'Morocco' },
  currencyCode: { type: DataTypes.STRING, defaultValue: 'MAD' },
  webhookUrl: { type: DataTypes.STRING, allowNull: true },
  apiKey: { type: DataTypes.STRING, unique: true }
});

module.exports = Partner;
