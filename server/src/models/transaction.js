// src/models/Transaction.js
const Transaction = sequelize.define('Transaction', {
  amount: { type: DataTypes.FLOAT },
  type: { type: DataTypes.STRING }, // loan, repayment, purchase, transfer
  status: { type: DataTypes.STRING }, // pending, completed, failed
  reference: { type: DataTypes.STRING } // Unique ID for tracking
});

// Link to Wallet
Wallet.hasMany(Transaction);
Transaction.belongsTo(Wallet);
