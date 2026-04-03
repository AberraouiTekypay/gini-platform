const express = require('express');
const ussdService = require('../services/UssdService');

const router = express.Router();

/**
 * USSD Gateway Endpoint
 * POST /api/ussd
 */
router.post('/', async (req, res) => {
  const { phoneNumber, text } = req.body;
  try {
    const response = await ussdService.handleUssdRequest(phoneNumber, text || "");
    res.set('Content-Type', 'text/plain');
    res.send(response);
  } catch (err) {
    res.status(500).send("END Internal Server Error");
  }
});

module.exports = router;
