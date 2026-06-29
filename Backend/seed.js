// Run this once after setting up MONGO_URI to populate your database
// with your real Projects, Skills, and About info: node seed.js
//
// IMPORTANT: review and edit the data below — fill in any missing
// links, descriptions, or skills that are yours.

require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const About = require('./models/About');

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

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log(`Seeded ${projects.length} projects.`);

    await Skill.deleteMany({});
    await Skill.insertMany(skills);
    console.log(`Seeded ${skills.length} skills.`);

    await About.deleteMany({});
    await About.create(about);
    console.log('Seeded About info.');

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
}

seed();