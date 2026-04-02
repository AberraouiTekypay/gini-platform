// server/src/services/RepaymentService.js
const { Op } = require('sequelize');
const Loan = require('../models/loan');
const User = require('../models/user');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const BankingProvider = require('../providers/BankingProvider');

/**
 * Service to handle automated loan repayments.
 */
class RepaymentService {
  /**
   * Processes all repayments due today.
   */
  async processDailyRepayments() {
    console.log('[RepaymentService] Starting daily repayment process...');
    const today = new Date().toISOString().split('T')[0];

    try {
      // Logic: Find all 'Active' loans with a repayment due 'Today'
      // Note: In a production app, we'd check the JSON repaymentSchedule
      const activeLoans = await Loan.findAll({
        where: {
          status: 'active',
          repaid: false,
          autoDebitAuthorized: true
        },
        include: { model: User, include: Wallet }
      });

      for (const loan of activeLoans) {
        // Simple logic: check if today is a due date in the schedule
        const currentDue = loan.repaymentSchedule.find(p => p.dueDate.startsWith(today) && p.status === 'pending');
        
        if (currentDue) {
          console.log(`[RepaymentService] Processing payment of ${currentDue.amount} for Loan ${loan.id}`);
          
          if (loan.User && loan.User.Wallet) {
            // Logic: Call BankingProvider.withdraw(userId, amount)
            const withdrawal = await BankingProvider.withdraw(loan.User.Wallet.id, currentDue.amount);

            if (withdrawal.success) {
              // Update Loan Schedule
              const updatedSchedule = loan.repaymentSchedule.map(p => 
                p.dueDate === currentDue.dueDate ? { ...p, status: 'paid', paidAt: new Date().toISOString() } : p
              );
              
              loan.repaymentSchedule = updatedSchedule;
              
              // Check if fully repaid
              const allPaid = updatedSchedule.every(p => p.status === 'paid');
              if (allPaid) {
                loan.status = 'repaid';
                loan.repaid = true;
              }
              
              await loan.save();

              // Logic: Record the result in the Transaction table
              await Transaction.create({
                amount: currentDue.amount,
                type: 'repayment',
                status: 'SETTLED',
                WalletId: loan.User.Wallet.id,
                reference: withdrawal.transactionId,
                providerName: withdrawal.provider,
                providerReference: withdrawal.transactionId
              });

              console.log(`[RepaymentService] Successfully processed payment for Loan ${loan.id}`);
            }
          }
        }
      }
    } catch (err) {
      console.error('[RepaymentService] Error processing daily repayments:', err.message);
    }
  }
}

module.exports = new RepaymentService();
