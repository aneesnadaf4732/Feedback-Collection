const express = require('express');
const Form = require('../models/Form');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const form = new Form({ ...req.body, createdBy: req.user.id });
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Form creation failed' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const forms = await Form.find({ createdBy: req.user.id });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
});

// Add more routes for updating, deleting forms, etc.

module.exports = router;