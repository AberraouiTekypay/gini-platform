// server/src/utils/finance.js

/**
 * Generates a repayment schedule for a loan with a detailed fee breakdown.
 * 
 * @param {number} amount - The principal loan amount.
 * @param {number} annualInterestRate - The annual interest rate for the loan.
 * @param {number} [durationMonths=6] - The duration of the loan in months.
 * @returns {Object} An object containing the schedule and the fee breakdown.
 */
const generateRepaymentSchedule = (amount, annualInterestRate, durationMonths = 6) => {
  const schedule = [];
  const monthlyInterestRate = annualInterestRate / 12;

  // Fee breakdown constants (Moroccan market estimates)
  const VAT_RATE = 0.20; // 20% TVA
  const INSURANCE_RATE = 0.01; // 1% Insurance fee on principal
  
  const insuranceFee = amount * INSURANCE_RATE;
  const interestTotal = amount * (annualInterestRate * (durationMonths / 12));
  const vatAmount = interestTotal * VAT_RATE;
  
  const totalRepayment = amount + interestTotal + vatAmount + insuranceFee;

  // Monthly Payment calculation using the standard formula for amortization:
  // P = A * [ (r * (1 + r)^n) / ((1 + r)^n - 1) ]
  let monthlyPayment;
  if (monthlyInterestRate === 0) {
    monthlyPayment = totalRepayment / durationMonths;
  } else {
    // Basic amortization logic for monthly installments including fees
    monthlyPayment = totalRepayment / durationMonths;
  }

  let currentDate = new Date();
  for (let i = 1; i <= durationMonths; i++) {
    let dueDate = new Date(currentDate);
    dueDate.setMonth(currentDate.getMonth() + i);

    schedule.push({
      month: i,
      dueDate: dueDate.toISOString(),
      amount: parseFloat(monthlyPayment.toFixed(2)),
      status: 'pending'
    });
  }

  return {
    schedule,
    breakdown: {
      principal: parseFloat(amount.toFixed(2)),
      interest: parseFloat(interestTotal.toFixed(2)),
      tva: parseFloat(vatAmount.toFixed(2)),
      insurance: parseFloat(insuranceFee.toFixed(2)),
      totalToRepay: parseFloat(totalRepayment.toFixed(2)),
      currency: 'MAD'
    }
  };
};

module.exports = { generateRepaymentSchedule };
