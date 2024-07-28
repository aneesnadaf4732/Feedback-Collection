const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{ 
    type: { type: String, enum: ['text', 'multipleChoice', 'rating'], required: true },
    question: { type: String, required: true },
    options: [String]
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  version: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);