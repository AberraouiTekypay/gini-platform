// server/src/utils/finance.js

/**
 * Generates a repayment schedule for a loan.
 * 
 * @param {number} amount - The principal loan amount.
 * @param {number} annualInterestRate - The annual interest rate for the loan.
 * @param {number} [durationMonths=6] - The duration of the loan in months.
 * @returns {Array<Object>} An array of objects, each representing a monthly repayment.
 */
const generateRepaymentSchedule = (amount, annualInterestRate, durationMonths = 6) => {
  const schedule = [];
  const monthlyInterestRate = annualInterestRate / 12;

  // Monthly Payment calculation using the standard formula for amortization:
  // P = A * [ (r * (1 + r)^n) / ((1 + r)^n - 1) ]
  // Where P is monthly payment, A is principal, r is monthly interest rate, n is number of months
  let monthlyPayment;
  if (monthlyInterestRate === 0) {
    monthlyPayment = amount / durationMonths;
  } else {
    monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -durationMonths));
  }

  let currentDate = new Date();
  for (let i = 1; i <= durationMonths; i++) {
    // Clone date and increment by i months
    let dueDate = new Date(currentDate);
    dueDate.setMonth(currentDate.getMonth() + i);

    schedule.push({
      month: i,
      dueDate: dueDate.toISOString(),
      amount: parseFloat(monthlyPayment.toFixed(2)),
      status: 'pending'
    });
  }

  return schedule;
};

module.exports = { generateRepaymentSchedule };
