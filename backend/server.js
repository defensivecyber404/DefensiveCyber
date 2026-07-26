require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const contactRoutes = require('./routes/contact');
const newsRoutes = require('./routes/news');
const faqRoutes = require('./routes/faqs');
const reviewsRoutes = require('./routes/reviews');
const clientsRoutes = require('./routes/clients');
const servicesRoutes = require('./routes/services');
const initDB = require('./database');

const app = express();
initDB();
const PORT = process.env.PORT || 5000;

// Middleware
// Security HTTP headers
app.use(helmet());
// HTTP request logger
app.use(morgan('dev'));
// CORS
app.use(cors());
// Body parser
app.use(express.json({ limit: '10kb' })); // Limit body size for security

// Global Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000, // Increased limit to prevent posts disappearing during active browsing
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/services', servicesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
