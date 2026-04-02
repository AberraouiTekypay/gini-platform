// src/models/Loan.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = require('./user');

const Loan = sequelize.define('Loan', {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, approved, rejected, repaid
  dueDate: { type: DataTypes.DATE, allowNull: true }, // Changed to true as it might not be set during initial application
  repaid: { type: DataTypes.BOOLEAN, defaultValue: false },
  reviewedBy: { type: DataTypes.INTEGER, allowNull: true },
  reviewDate: { type: DataTypes.DATE, allowNull: true }
});

Loan.belongsTo(User);
User.hasMany(Loan);

module.exports = Loan;
