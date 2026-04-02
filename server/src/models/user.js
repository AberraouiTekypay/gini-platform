const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = sequelize.define('User', {

  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'user' },
  kycStatus: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, verified, rejected
  isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  dailyLimit: { type: DataTypes.FLOAT, defaultValue: 5000 },
  monthlyLimit: { type: DataTypes.FLOAT, defaultValue: 50000 }
});

module.exports = User;
