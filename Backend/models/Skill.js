const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: 'General' }, // e.g. Frontend, Backend, Tools
    proficiency: { type: Number, min: 0, max: 100, default: 70 }, // percentage
    icon: { type: String, default: '' }, // emoji or icon name
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);