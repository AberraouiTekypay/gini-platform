/**
 * Anti-Money Laundering (AML) Middleware
 * Flags any transaction over 10,000 MAD for manual review.
 */
const amlMiddleware = (req, res, next) => {
  const { amount } = req.body;
  
  if (amount && parseFloat(amount) > 10000) {
    console.warn(`[AML Monitor] Transaction over 10,000 MAD detected. Flagging for review.`);
    req.fraudAlert = true;
  } else {
    req.fraudAlert = false;
  }

  next();
};

module.exports = amlMiddleware;
