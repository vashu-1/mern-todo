import mongoose from 'mongoose';

// Optimize MongoDB connection with pooling and timeouts
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      // Connection pool settings for better performance
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 2,  // Minimum number of connections
      
      // Timeout settings to prevent slow responses
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      
      // Performance optimizations
      maxIdleTimeMS: 10000, // Close idle connections after 10s
      compressors: ['zlib'], // Enable compression for network traffic
    });
    
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully');
    });
    
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Don't exit process, let it retry
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

export default connectDB;
