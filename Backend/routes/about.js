const express = require('express');
const router = express.Router();
const About = require('../models/About');

// GET /api/about - get the single About record
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ error: 'About info not set up yet' });
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch about info', details: err.message });
  }
});

// PUT /api/about - update the About record (creates it if it doesn't exist yet)
router.put('/', async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(about);
  } catch (err) {
    res.status(400).json({ error: 'Could not update about info', details: err.message });
  }
});

module.exports = router;