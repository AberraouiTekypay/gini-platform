const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const KycOrchestrator = require('../providers/KycProvider');
const redisClient = require('../utils/redisClient');

router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  res.json({ id: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.post('/reset-pin/request', async (req, res) => {
  const { email, selfie } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Simulate retrieving stored ID reference for the user
  const storedID = `ID-${user.id}`;
  
  try {
    const kycResult = await KycOrchestrator.verifyBiometric(selfie, storedID);
    
    if (kycResult.success && kycResult.matchConfidence >= 0.99) {
      const resetToken = jwt.sign({ id: user.id, intent: 'reset-pin' }, process.env.JWT_SECRET, { expiresIn: '15m' });
      // Store in Redis with 15 mins expiry (900 seconds)
      await redisClient.set(`reset-session:${resetToken}`, user.id, 'EX', 900);
      res.json({ message: 'Biometric verification successful. Proceed to reset PIN.', resetToken });
    } else {
      res.status(401).json({ error: 'Biometric verification failed. Match confidence too low.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error during biometric verification' });
  }
});

router.post('/reset-pin/confirm', async (req, res) => {
  const { resetToken, newPin } = req.body;
  
  if (!resetToken) return res.status(401).json({ error: 'Invalid or expired reset token' });

  const sessionExists = await redisClient.get(`reset-session:${resetToken}`);
  if (!sessionExists) {
    return res.status(401).json({ error: 'Invalid or expired reset token' });
  }

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    if (decoded.intent !== 'reset-pin') throw new Error('Invalid token intent');

    const user = await User.findByPk(decoded.id);
    if (!user) throw new Error('User not found');

    const hashedPin = await bcrypt.hash(newPin, 10);
    user.password = hashedPin; // Reusing password field as PIN
    await user.save();

    await redisClient.del(`reset-session:${resetToken}`);
    res.json({ message: 'PIN reset successfully' });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
