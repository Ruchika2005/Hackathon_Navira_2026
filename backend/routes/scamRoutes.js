const express = require('express');
const router = express.Router();
const { scamChat } = require('../controllers/scamController');

router.post('/chat', scamChat);

module.exports = router;
