const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const PendingAction = sequelize.define('PendingAction', {
  actionType: { type: DataTypes.STRING, allowNull: false }, // 'REVERSAL', 'LOAN_APPROVAL'
  payload: { type: DataTypes.JSON, allowNull: false },
  status: { type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'), defaultValue: 'PENDING' },
  requestedBy: { type: DataTypes.INTEGER, allowNull: false },
  approvedBy: { type: DataTypes.INTEGER, allowNull: true },
});

module.exports = PendingAction;
