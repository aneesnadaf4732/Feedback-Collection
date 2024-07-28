const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  responses: [{
    question: { type: String, required: true },
    answer: mongoose.Schema.Types.Mixed
  }],
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);