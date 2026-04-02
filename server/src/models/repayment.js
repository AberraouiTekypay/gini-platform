// src/models/Repayment.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const Loan = require('./loan');

const Repayment = sequelize.define('Repayment', {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  paidAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Repayment.belongsTo(Loan);
Loan.hasMany(Repayment);

module.exports = Repayment;
