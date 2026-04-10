const express = require('express');
const router  = express.Router();
const SirenReport = require('../models/SirenReport');

// GET /api/siren  — fetch all reports < 24 h old
router.get('/', async (req, res) => {
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const reports = await SirenReport.find({ createdAt: { $gte: cutoff } })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/siren  — submit a new report
router.post('/', async (req, res) => {
  try {
    const { message, lang } = req.body;
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ message: 'Report too short (min 10 chars).' });
    }
    const report = await SirenReport.create({
      message: message.trim().slice(0, 300),
      lang: lang || 'english',
    });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/siren/:id  — remove a specific report
router.delete('/:id', async (req, res) => {
  try {
    await SirenReport.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
