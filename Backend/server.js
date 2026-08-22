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

// Render sits behind a reverse proxy
app.set('trust proxy', 1);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ========================================
// CORS CONFIGURATION
// ========================================

const allowedOrigins = [
  // Current production frontend
  'https://pushpendracode.netlify.app',

  // Previous frontend domain
  'https://pushpendradevpro.netlify.app',

  // Local development
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('Blocked CORS origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    allowedHeaders: ['Content-Type', 'Authorization'],

    credentials: true,
  })
);

// Handle preflight requests
app.options('*', cors());


// ========================================
// BODY PARSER
// ========================================

app.use(express.json());


// ========================================
// API RATE LIMIT
// ========================================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  message: {
    error: 'Too many requests, please try again later.',
  },
});

app.use('/api', apiLimiter);


// ========================================
// CONTACT FORM RATE LIMIT
// ========================================

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,

  message: {
    error: 'Too many messages sent. Please try again later.',
  },
});

app.use('/api/messages', contactLimiter);


// ========================================
// API ROUTES
// ========================================

app.use('/api/projects', projectRoutes);

app.use('/api/skills', skillRoutes);

app.use('/api/about', aboutRoutes);

app.use('/api/messages', messageRoutes);


// ========================================
// HEALTH CHECK
// ========================================

app.get('/', (req, res) => {
  res.json({
    status: 'Code Galaxy API is running',
  });
});


// ========================================
// MONGODB CONNECTION
// ========================================

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