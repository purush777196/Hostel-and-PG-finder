import dotenv from 'dotenv';
dotenv.config();

import { validateEnv } from './utils/envValidate.js';
validateEnv();

import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB (non-blocking for server initialization)
connectDB();

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` Hostel and PG Finder API Server Started`);
  console.log(` Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(` Port        : ${PORT}`);
  console.log(` Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

// Graceful shutdown handling
const shutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  await disconnectDB();
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  // Force close after 10s timeout
  setTimeout(() => {
    console.error('Forced shutdown due to timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default server;
