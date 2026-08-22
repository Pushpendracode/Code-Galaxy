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
    title: 'Hostel Management System (HostelPro)',
    description:
      'Full-stack MERN application for managing hostel operations — role-based access control (RBAC) across 3 user roles, Razorpay payments, automated billing, and a maintenance request system. Hardened for production with rate limiting, Helmet, and CORS.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'JWT Auth', 'RBAC', 'Razorpay'],
    liveLink: 'https://hotelmanagmen.netlify.app',
    githubLink: 'https://github.com/Pushpendracode',
    status: 'Completed',
    featured: true,
    order: 1,
  },
  {
    title: 'Affiloop AI — AI-Powered Affiliate Marketplace',
    description:
      'AI-powered affiliate marketplace currently in development — full codebase audit, complete Admin CRUD build-out, and a redesigned typography/color-token design system.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    liveLink: '',
    githubLink: 'https://github.com/Pushpendracode',
    status: 'In Progress',
    featured: true,
    order: 2,
  },
  {
    title: 'Recipes CRUD API & User Auth API',
    description:
      'Two MVC-pattern REST APIs — full CRUD for recipe management and a Bearer-token authentication system with bcrypt password hashing. Documented in Postman and deployed on Render.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt'],
    liveLink: '',
    githubLink: 'https://github.com/Pushpendracode',
    status: 'Completed',
    featured: false,
    order: 3,
  },
  {
    title: 'LUXE Store & Add to Cart App',
    description:
      'React e-commerce interfaces using React Router v6 and Context + useReducer for cart state management, one integrating a live third-party product API.',
    techStack: ['React', 'React Router v6', 'Context API', 'useReducer'],
    liveLink: '',
    githubLink: 'https://github.com/Pushpendracode',
    status: 'Completed',
    featured: false,
    order: 4,
  },
];

const skills = [
  { name: 'React', category: 'Frontend', proficiency: 80, icon: '⚛️', order: 1 },
  { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 80, icon: '🟨', order: 2 },
  { name: 'HTML/CSS', category: 'Frontend', proficiency: 85, icon: '🎨', order: 3 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 75, icon: '💨', order: 4 },
  { name: 'Redux Toolkit', category: 'Frontend', proficiency: 70, icon: '🧩', order: 5 },
  { name: 'Node.js', category: 'Backend', proficiency: 75, icon: '🟢', order: 6 },
  { name: 'Express.js', category: 'Backend', proficiency: 75, icon: '🚂', order: 7 },
  { name: 'MongoDB / Mongoose', category: 'Backend', proficiency: 70, icon: '🍃', order: 8 },
  { name: 'JWT & Bearer Auth', category: 'Backend', proficiency: 75, icon: '🔐', order: 9 },
  { name: 'RBAC', category: 'Backend', proficiency: 70, icon: '🛡️', order: 10 },
  { name: 'Razorpay Integration', category: 'Backend', proficiency: 65, icon: '💳', order: 11 },
  { name: 'Git & GitHub', category: 'Tools', proficiency: 75, icon: '🔧', order: 12 },
  { name: 'Postman', category: 'Tools', proficiency: 75, icon: '📮', order: 13 },
  { name: 'Render / Netlify', category: 'Tools', proficiency: 70, icon: '🚀', order: 14 },
];

const about = {
  name: 'Pushpendra Singh',
  tagline: 'MERN Stack Developer | Building things that genuinely help people',
  bio:
    'I am a MERN stack developer from Unnao, Uttar Pradesh, India, who ships full-stack applications end-to-end — REST APIs, JWT authentication, RBAC, payment integrations, and production deployment. I have built and hardened multiple live projects, fixed real production issues, and consistently turned reviewer feedback into shipped improvements.',
  profileImageUrl: '',
  resumeLink: '',
  socialLinks: {
    github: 'https://github.com/Pushpendracode',
    linkedin: 'https://www.linkedin.com/in/pushpendra-singh-aa9a40426/',
    twitter: '',
    email: 'pushpendra226664@gmail.com',
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