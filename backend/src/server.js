require('dotenv').config();

// Environment variable validation
const requiredEnvVars = []; // HF_API_TOKEN is now optional for basic operation
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  console.error('Please set the following environment variables:');
  missingVars.forEach(varName => {
    console.error(`  - ${varName}`);
  });
  console.error('\nSee .env.example for required variables.');
  process.exit(1);
}

// Warning for optional HF_API_TOKEN
if (!process.env.HF_API_TOKEN) {
  console.warn('⚠️  HF_API_TOKEN not set - translation service will not work');
  console.warn('Set HF_API_TOKEN to enable translation functionality');
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const translateRoutes = require('./routes/translate');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('✅ Environment variables validated');

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => req.path === '/health' // Skip rate limiting for health checks
});
app.use(limiter);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://mohammed054.github.io',
  'https://mohammed054.github.io/bashify'
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body parsing with size limit
app.use(express.json({ limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'ERROR' : 'INFO';
    console.log(`[${logLevel}] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Routes
app.use('/api/translate', translateRoutes);

// Enhanced health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'OK',
    message: 'Bashify backend is running',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    services: {
      huggingface: process.env.HF_API_TOKEN ? 'configured' : 'missing',
      memory: process.memoryUsage(),
      uptime: process.uptime()
    }
  };
  
  // Test Hugging Face API connectivity (optional, with timeout)
  if (process.env.HF_API_TOKEN) {
    try {
      const axios = require('axios');
      const response = await axios.get('https://api-inference.huggingface.co/status', {
        timeout: 5000,
        headers: {
          'Authorization': `Bearer ${process.env.HF_API_TOKEN}`
        }
      });
      health.services.huggingface = 'connected';
      health.services.huggingfaceStatus = response.status;
    } catch (error) {
      health.services.huggingface = 'error';
      health.services.huggingfaceError = error.message;
      health.status = 'DEGRADED';
    }
  }
  
  const statusCode = health.status === 'OK' ? 200 : 503;
  res.status(statusCode).json(health);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
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
  console.log(`404: ${req.method} ${req.originalUrl}`);
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

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Bashify backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n🔄 ${signal} received, shutting down gracefully...`);
  
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
  
  // Force close after 30 seconds
  setTimeout(() => {
    console.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));