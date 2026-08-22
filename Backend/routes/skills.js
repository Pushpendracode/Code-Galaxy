const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Simple protection for write operations — checks a secret key from env vars
function requireAdminKey(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// GET /api/skills - list all skills (public, read-only)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch skills', details: err.message });
  }
});

// GET /api/skills/:id - get a single skill (public, read-only)
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch skill', details: err.message });
  }
});

// POST /api/skills - add a new skill (protected)
router.post('/', requireAdminKey, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: 'Could not create skill', details: err.message });
  }
});

// PUT /api/skills/:id - update a skill (protected)
router.put('/:id', requireAdminKey, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(400).json({ error: 'Could not update skill', details: err.message });
  }
});

// DELETE /api/skills/:id - delete a skill (protected)
router.delete('/:id', requireAdminKey, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete skill', details: err.message });
  }
});

module.exports = router;