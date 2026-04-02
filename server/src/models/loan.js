// src/models/Loan.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = require('./user');

const Loan = sequelize.define('Loan', {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { 
    type: DataTypes.ENUM('pending', 'pending_signature', 'active', 'approved', 'rejected', 'repaid', 'OVERDUE'), 
    defaultValue: 'pending' 
  },
  signatureStatus: { 
    type: DataTypes.ENUM('PENDING', 'SIGNED', 'FAILED'), 
    defaultValue: 'PENDING' 
  },
  autoDebitAuthorized: { type: DataTypes.BOOLEAN, defaultValue: false },
  creditGrade: { type: DataTypes.STRING, allowNull: true },
  interestRate: { type: DataTypes.FLOAT, allowNull: true },
  repaymentSchedule: { type: DataTypes.JSON, allowNull: true },
  dueDate: { type: DataTypes.DATE, allowNull: true },
  repaid: { type: DataTypes.BOOLEAN, defaultValue: false },
  reviewedBy: { type: DataTypes.INTEGER, allowNull: true },
  reviewedAt: { type: DataTypes.DATE, allowNull: true },
  adminNotes: { type: DataTypes.TEXT, allowNull: true },
  PartnerId: { type: DataTypes.INTEGER, allowNull: true }
});

const Partner = require('./Partner');
Loan.belongsTo(Partner);
Partner.hasMany(Loan);

Loan.belongsTo(User);
User.hasMany(Loan);

module.exports = Loan;
