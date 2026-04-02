// src/services/scoringService.js
/**
 * Simulated integration with a third‑party scoring provider.
 * In a real implementation this would call an external API.
 */
const someThirdPartyScoringAPI = async (email) => {
  // TODO: replace with real API call
  return 700;
};

/**
 * Calculate a user's credit score.
 * @param {Object} user - Sequelize user instance
 * @returns {Promise<boolean>} whether the user passes the scoring threshold
 */
const calculateScore = async (user) => {
  const score = await someThirdPartyScoringAPI(user.email);
  return score > 650; // Example threshold
};

module.exports = { calculateScore };
