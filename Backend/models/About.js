const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, default: '' },
    bio: { type: String, required: true },
    profileImageUrl: { type: String, default: '' },
    resumeLink: { type: String, default: '' },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      email: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);