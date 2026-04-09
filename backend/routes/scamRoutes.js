const express = require('express');
const router = express.Router();
const scamController = require('../controllers/scamController');

// POST /api/scam-chat
router.post('/chat', scamController.getScamChatResponse);

module.exports = router;
