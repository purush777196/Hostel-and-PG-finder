import mongoose from 'mongoose';

/**
 * Reusable MongoDB Connection Module
 * Connects to MongoDB using MONGODB_URI environment variable
 * Resilient: Handles connection failures gracefully without crashing the server,
 * ensuring health endpoints remain accessible even when DB is offline.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[Database] WARNING: MONGODB_URI environment variable is not defined.');
    console.warn('[Database] Database connection skipped. Health check remains operational.');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[Database] MongoDB Connection Failed: ${error.message}`);
    console.warn('[Database] Application running in degraded database mode.');
    return null;
  }
};

/**
 * Disconnect MongoDB connection gracefully
 */
export const disconnectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('[Database] MongoDB disconnected cleanly.');
    }
  } catch (error) {
    console.error(`[Database] Error during MongoDB disconnect: ${error.message}`);
  }
};

// Event listeners for connection monitoring
mongoose.connection.on('disconnected', () => {
  console.warn('[Database] MongoDB connection lost.');
});

mongoose.connection.on('error', (err) => {
  console.error(`[Database] MongoDB runtime error: ${err.message}`);
});

export default connectDB;
