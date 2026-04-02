// server/src/models/AuditLog.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const AuditLog = sequelize.define('AuditLog', {
  action: { type: DataTypes.STRING, allowNull: false },
  entityType: { type: DataTypes.STRING, allowNull: false }, // 'Loan', 'User', etc.
  entityId: { type: DataTypes.INTEGER, allowNull: true },
  adminId: { type: DataTypes.INTEGER, allowNull: false },
  details: { type: DataTypes.JSON, allowNull: true },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = AuditLog;
