const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = sequelize.define('User', {

  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'user' }, // user, admin, ROLE_AGENT, CREDIT_OFFICER
  kycStatus: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, verified, rejected
  isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  dailyLimit: { type: DataTypes.FLOAT, defaultValue: 5000 },
  monthlyLimit: { type: DataTypes.FLOAT, defaultValue: 50000 },
  floatBalance: { type: DataTypes.FLOAT, defaultValue: 0 },
  financePreference: { 
    type: DataTypes.ENUM('CONVENTIONAL', 'ISLAMIC'), 
    defaultValue: 'CONVENTIONAL' 
  },
  PartnerId: { type: DataTypes.INTEGER, allowNull: true },
  referredBy: { type: DataTypes.INTEGER, allowNull: true },
  referralCode: { type: DataTypes.STRING, unique: true }
});

const Partner = require('./Partner');
User.belongsTo(Partner);
Partner.hasMany(User);

module.exports = User;
