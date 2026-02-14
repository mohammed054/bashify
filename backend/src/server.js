require('dotenv').config();
const express = require('express');
const cors = require('cors');
const translateRoutes = require('./routes/translate');

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced logging
const log = (message, type = 'INFO') => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}] ${message}`);
};

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Routes
app.use('/api/translate', translateRoutes);

// Main route for frontend connection
app.get('/', (req, res) => {
  log('Root endpoint accessed');
  res.json({ 
    message: 'Bashify backend is running successfully!',
    version: '1.0.0',
    endpoints: {
      '/api/translate': 'Translate English to Bash commands',
      '/health': 'Health check endpoint'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  log('Health check endpoint accessed');
  res.json({ 
    status: 'OK', 
    message: 'Bashify backend is running',
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  log('API info endpoint accessed');
  res.json({
    name: 'Bashify Backend API',
    version: '1.0.0',
    description: 'English to Bash command translation service',
    endpoints: {
      'GET /': 'Server status and available endpoints',
      'GET /health': 'Health check',
      'GET /api': 'API information',
      'POST /api/translate': 'Translate English text to Bash commands'
    },
    requirements: {
      'Content-Type': 'application/json',
      'Body': { input: 'string (required)' }
    },
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  log(`Error: ${err.message}`, 'ERROR');
  console.error(err.stack);
  
  // Don't expose internal errors in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  log(`404: ${req.method} ${req.originalUrl}`, 'WARN');
  res.status(404).json({ 
    error: 'Endpoint not found',
    available_endpoints: [
      'GET /',
      'GET /health', 
      'GET /api',
      'POST /api/translate'
    ]
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  log('SIGTERM received, shutting down gracefully', 'INFO');
  process.exit(0);
});

process.on('SIGINT', () => {
  log('SIGINT received, shutting down gracefully', 'INFO');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  log(`🚀 Bashify backend server running on port ${PORT}`, 'INFO');
  log(`📊 Server ready to accept requests`, 'INFO');
  log(`🔗 Health check available at: http://localhost:${PORT}/health`, 'INFO');
  log(`🔗 API info available at: http://localhost:${PORT}/api`, 'INFO');
});
