const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Simple protection for write operations — checks a secret key from env vars
function requireAdminKey(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// GET /api/projects - list all projects (public, read-only)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch projects', details: err.message });
  }
});

// GET /api/projects/:id - get a single project (public, read-only)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch project', details: err.message });
  }
});

// POST /api/projects - create a new project (protected)
router.post('/', requireAdminKey, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Could not create project', details: err.message });
  }
});

// PUT /api/projects/:id - update a project (protected)
router.put('/:id', requireAdminKey, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: 'Could not update project', details: err.message });
  }
});

// DELETE /api/projects/:id - delete a project (protected)
router.delete('/:id', requireAdminKey, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete project', details: err.message });
  }
});

module.exports = router;