// index.js

// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
  origin: '*', // Change this in production for security
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Logging
app.use(morgan('combined'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute.',
});
app.use(limiter);

// Serve static frontend files from 'public' folder
app.use(express.static('public'));

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('ERROR: GOOGLE_API_KEY is not set in .env file');
  process.exit(1);
}

// POST /chat endpoint to handle chatbot messages
app.post('/chat',
  // Input validation using express-validator
  body('message').trim().notEmpty().withMessage('Message cannot be empty.'),
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return first error message
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { message } = req.body;

    try {
      // Prepare the payload as per Google Gemini AI requirements
      const payload = {
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      };

      // Make a POST request to Google Gemini AI API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_API_KEY}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Extract the generated content from the response
      const generatedText = response.data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';

      res.json({ reply: generatedText });
    } catch (error) {
      console.error('Error communicating with Google Gemini AI:', error.response?.data || error.message);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
); 

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Graceful Shutdown
const shutdown = () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

// Handle termination signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);