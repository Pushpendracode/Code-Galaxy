const express = require('express');
const router = express.Router();
const About = require('../models/About');

// Simple protection for write operations — checks a secret key from env vars
function requireAdminKey(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// GET /api/about - get the single About record (public, read-only — fine as-is)
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ error: 'About info not set up yet' });
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch about info', details: err.message });
  }
});

// PUT /api/about - update the About record (protected — requires admin key)
router.put('/', requireAdminKey, async (req, res) => {
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