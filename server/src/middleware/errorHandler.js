/**
 * Centralized Error Handling Middleware
 * Captures all unhandled synchronous and asynchronous errors
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode) || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Log error stack for server monitoring
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(isProduction ? {} : { stack: err.stack }),
  });
};

