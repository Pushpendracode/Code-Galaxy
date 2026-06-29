require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const aboutRoutes = require('./routes/about');
const messageRoutes = require('./routes/messages');

const Project = require('./models/Project');
const Skill = require('./models/Skill');
const About = require('./models/About');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Code Galaxy API is running' });
});

// TEMPORARY SEED ROUTE — visit this once after deploying to populate your database,
// then DELETE this route (or remove the file reference) for security.
app.get('/api/seed-once', async (req, res) => {
  try {
    const projects = [
      {
        title: 'Hostel Management System',
        description:
          'Full-stack MERN application for managing hostel operations — role-based access control (RBAC) for admins, staff, and students, billing and payment tracking, and a maintenance request system.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'RBAC'],
        liveLink: 'https://hotelmanagmen.netlify.app',
        githubLink: 'https://github.com/Pushpendracode',
        status: 'Completed',
        featured: true,
        order: 1,
      },
      {
        title: 'Code Galaxy — Portfolio',
        description:
          'Space-themed personal portfolio built with React, Vite, and Framer Motion, with a dynamic project showcase powered by this backend API.',
        techStack: ['React', 'Vite', 'Framer Motion', 'Node.js', 'Express', 'MongoDB'],
        liveLink: 'https://pushpendradevpro.netlify.app',
        githubLink: 'https://github.com/Pushpendracode',
        status: 'Completed',
        featured: true,
        order: 2,
      },
      {
        title: 'OneInput — AI Content Repurposing Tool',
        description:
          'AI-powered SaaS tool for repurposing content across formats, built with Next.js, TypeScript, and Tailwind CSS, using the Anthropic SDK.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Anthropic SDK'],
        liveLink: '',
        githubLink: 'https://github.com/Pushpendracode',
        status: 'In Progress',
        featured: false,
        order: 3,
      },
    ];

    const skills = [
      { name: 'React', category: 'Frontend', proficiency: 80, icon: '⚛️', order: 1 },
      { name: 'JavaScript', category: 'Frontend', proficiency: 80, icon: '🟨', order: 2 },
      { name: 'HTML/CSS', category: 'Frontend', proficiency: 85, icon: '🎨', order: 3 },
      { name: 'Node.js', category: 'Backend', proficiency: 75, icon: '🟢', order: 4 },
      { name: 'Express.js', category: 'Backend', proficiency: 75, icon: '🚂', order: 5 },
      { name: 'MongoDB', category: 'Backend', proficiency: 70, icon: '🍃', order: 6 },
      { name: 'Git & GitHub', category: 'Tools', proficiency: 75, icon: '🔧', order: 7 },
      { name: 'Render / Netlify', category: 'Tools', proficiency: 70, icon: '🚀', order: 8 },
    ];

    const about = {
      name: 'Pushpendra Singh',
      tagline: 'MERN Stack Developer | Building things that genuinely help people',
      bio:
        'I am a MERN stack developer from Unnao, Uttar Pradesh, India. I build full-stack web applications with clean code and real attention to detail. My goal is to become a world-class developer by building software that solves real problems — not just generates revenue.',
      profileImageUrl: '',
      resumeLink: '',
      socialLinks: {
        github: 'https://github.com/Pushpendracode',
        linkedin: '',
        twitter: '',
        email: '',
      },
    };

    await Project.deleteMany({});
    await Project.insertMany(projects);

    await Skill.deleteMany({});
    await Skill.insertMany(skills);

    await About.deleteMany({});
    await About.create(about);

    res.json({ message: 'Seeded successfully! Projects, Skills, and About are now in the database.' });
  } catch (err) {
    res.status(500).json({ error: 'Seeding failed', details: err.message });
  }
});

// Connect to MongoDB, then start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });