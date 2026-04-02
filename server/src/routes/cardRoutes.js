const express = require('express');
const { authenticate } = require('../middlewares/auth');
const cardController = require('../Controllers/cardController');

const router = express.Router();

// Issue a new virtual card
router.post('/issue', authenticate, cardController.issueCard);

// Toggle freeze/active status
router.patch('/:id/freeze', authenticate, cardController.toggleFreeze);

module.exports = router;
