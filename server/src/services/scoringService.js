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
 * @returns {Promise<number>} the user's credit score
 */
const calculateScore = async (user) => {
  const score = await someThirdPartyScoringAPI(user.email);
  return score;
};

module.exports = { calculateScore };
