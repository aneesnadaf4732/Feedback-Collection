const express = require('express');
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const feedback = new Feedback({ ...req.body, submittedBy: req.user.id });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Feedback submission failed' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('form');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Add more routes for updating feedback status, analytics, etc.

module.exports = router;