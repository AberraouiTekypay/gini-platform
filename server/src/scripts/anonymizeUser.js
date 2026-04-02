const { sequelize } = require('../models');
const User = require('../models/user');
const crypto = require('crypto');

/**
 * RTBF (Right To Be Forgotten) - Data Anonymization Script
 * Irreversibly hashes a user's PII while maintaining their anonymous ledger history.
 * Usage: node src/scripts/anonymizeUser.js <userId>
 */
const anonymizeUser = async (userId) => {
  if (!userId) {
    console.error('Please provide a User ID.');
    process.exit(1);
  }

  const t = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction: t });
    
    if (!user) {
      console.error(`User ${userId} not found.`);
      await t.rollback();
      process.exit(1);
    }

    console.log(`[RTBF] Starting anonymization for User ID: ${user.id}...`);

    // Generate irreversible hash for PII
    const hashData = (data) => crypto.createHash('sha256').update(data + Date.now().toString()).digest('hex');

    // Overwrite PII fields
    user.email = `anonymized_${hashData(user.email)}@gini-deleted.local`;
    user.password = hashData('deleted');
    // Assuming firstName and lastName might be added later, or other PII fields. 
    // The instructions say "hashes a user's PII". We only have email/password directly on user model for now, plus phone/nationalId if they were added.
    
    user.isBlocked = true; // Lock the account permanently
    user.kycStatus = 'rejected';

    await user.save({ transaction: t });
    
    await t.commit();
    console.log(`[RTBF] User ${userId} has been successfully anonymized.`);
    process.exit(0);
  } catch (err) {
    console.error('[RTBF] Error during anonymization:', err);
    await t.rollback();
    process.exit(1);
  }
};

const args = process.argv.slice(2);
anonymizeUser(args[0]);
