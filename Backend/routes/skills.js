const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// GET /api/skills - list all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch skills', details: err.message });
  }
});

// GET /api/skills/:id - get a single skill
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch skill', details: err.message });
  }
});

// POST /api/skills - add a new skill
router.post('/', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: 'Could not create skill', details: err.message });
  }
});

// PUT /api/skills/:id - update a skill
router.put('/:id', async (req, res) => {
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

// DELETE /api/skills/:id - delete a skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete skill', details: err.message });
  }
});

module.exports = router;