require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const aboutRoutes = require('./routes/about');
const messageRoutes = require('./routes/messages');

const app = express();

// Render sits behind a reverse proxy — this tells Express to trust the
// X-Forwarded-For header it sets, so express-rate-limit can correctly
// identify each visitor's real IP instead of just seeing Render's proxy IP.
app.set('trust proxy', 1);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
const allowedOrigins = [
  'https://pushpendradevpro.netlify.app',
  'http://localhost:5173', // local dev
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(express.json());

// Rate limit: applies to all API routes, protects against spam/abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', apiLimiter);

// Stricter limit specifically on the contact form, since it triggers email sends
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact submissions per hour
  message: { error: 'Too many messages sent. Please try again later.' },
});
app.use('/api/messages', contactLimiter);

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Code Galaxy API is running' });
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