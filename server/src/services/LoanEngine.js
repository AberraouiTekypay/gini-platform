// server/src/services/LoanEngine.js

/**
 * Evaluates a loan application based on the user's data and Credo score.
 * 
 * @param {Object} userData - Information about the user.
 * @param {number} credoScore - The user's credit score.
 * @returns {Object} An object containing the assigned grade, interest rate, and initial status.
 */
const evaluateApplication = (userData, credoScore) => {
  let grade = '';
  let interestRate = 0;
  let status = 'pending';

  if (credoScore > 700) {
    grade = 'A';
    interestRate = 0.05; // 5% Low Interest
    status = 'approved';
  } else if (credoScore >= 400 && credoScore <= 700) {
    grade = 'B';
    interestRate = 0.10; // 10% Standard
    status = 'approved';
  } else {
    grade = 'Manual Review';
    interestRate = 0.15; // 15% Default for higher risk or manual review
    status = 'pending';
  }

  return { grade, interestRate, status };
};

module.exports = { evaluateApplication };
