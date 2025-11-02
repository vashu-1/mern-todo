import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import connectDB from './conn/db.js';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';

dotenv.config();
const app = express();

// Connect to database
connectDB();

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development, configure for production
  crossOriginEmbedderPolicy: false,
}));

// Enable text compression (gzip/brotli)
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6, // Balance between compression ratio and speed
}));

// CORS configuration
app.use(
  cors({
    origin: 'https://mern-todo-org.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Response time monitoring and logging
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Log slow requests (>1000ms)
    if (duration > 1000) {
      console.warn(`⚠️  Slow request: ${req.method} ${req.url} - ${duration}ms`);
    }
    
    // Add response time header
    res.set('X-Response-Time', `${duration}ms`);
  });
  
  next();
});

// Cache control for API responses
app.use((req, res, next) => {
  // Don't cache API responses by default
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// api
app.use('/api/user', userRoutes);
app.use('/api/list', listRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
