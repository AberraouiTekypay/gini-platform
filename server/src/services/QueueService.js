const { Queue, Worker } = require('bullmq');
const redisClient = require('../utils/redisClient');
const Loan = require('../models/loan');
const User = require('../models/user');

// Create a queue for Webhook events
const webhookQueue = new Queue('webhook-events', { connection: redisClient });

// Create a worker to process the events asynchronously
const webhookWorker = new Worker('webhook-events', async (job) => {
  const { type, payload } = job.data;
  console.log(`[QueueWorker] Processing job ${job.id} of type ${type}...`);

  if (type === 'REGULA_KYC') {
    const { userId, status, confidence } = payload;
    const user = await User.findByPk(userId);
    if (user) {
      user.kycStatus = status === 'success' ? 'verified' : 'rejected';
      if (status !== 'success') user.isBlocked = true;
      await user.save();
    }
  } else if (type === 'DAMANESIGN_SIGNATURE') {
    const { loanId, signatureStatus } = payload;
    const loan = await Loan.findByPk(loanId);
    if (loan) {
      loan.signatureStatus = signatureStatus === 'SIGNED' ? 'SIGNED' : 'FAILED';
      if (signatureStatus === 'SIGNED') loan.status = 'active';
      await loan.save();
    }
  }
}, { connection: redisClient });

webhookWorker.on('completed', (job) => {
  console.log(`[QueueWorker] Job ${job.id} completed successfully.`);
});

webhookWorker.on('failed', (job, err) => {
  console.error(`[QueueWorker] Job ${job.id} failed:`, err);
});

module.exports = { webhookQueue };
