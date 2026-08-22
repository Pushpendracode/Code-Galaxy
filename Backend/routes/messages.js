const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { sendContactNotification } = require('../utils/sendEmail');

// Simple protection for admin-only operations — checks a secret key from env vars
function requireAdminKey(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// POST /api/messages - someone submits the contact form (public — intentional)
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required' });
  }

  try {
    // Save to database first — this should succeed even if email fails
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Try to send the email notification, but don't fail the request if it errors
    try {
      await sendContactNotification({ name, email, message });
    } catch (emailErr) {
      console.error('Email notification failed (message was still saved):', emailErr.message);
    }

    res.status(201).json({ message: 'Thank you! Your message has been sent.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not save your message', details: err.message });
  }
});

// GET /api/messages - view all messages (protected — contains real people's PII)
router.get('/', requireAdminKey, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch messages', details: err.message });
  }
});

// PUT /api/messages/:id/read - mark a message as read (protected)
router.put('/:id/read', requireAdminKey, async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Message not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not update message', details: err.message });
  }
});

module.exports = router;