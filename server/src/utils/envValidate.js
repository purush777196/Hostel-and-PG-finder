/**
 * Environment Variables Validator
 * Validates the presence and format of required environment variables,
 * providing safe fallbacks and warnings without exposing sensitive data.
 */
export const validateEnv = () => {
  const warnings = [];
  const validNodeEnvs = ['development', 'test', 'production'];

  const nodeEnv = process.env.NODE_ENV || 'development';
  if (!validNodeEnvs.includes(nodeEnv)) {
    warnings.push(`NODE_ENV "${nodeEnv}" is unconventional. Expected one of: ${validNodeEnvs.join(', ')}.`);
  }

  const port = process.env.PORT;
  if (port && (isNaN(Number(port)) || Number(port) <= 0 || Number(port) > 65535)) {
    warnings.push(`PORT "${port}" is invalid. Must be an integer between 1 and 65535.`);
  }

  const clientUrl = process.env.CLIENT_URL;
  if (!clientUrl) {
    warnings.push('CLIENT_URL is not set. Defaulting to http://localhost:5173 for CORS.');
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    warnings.push('MONGODB_URI is not set. Database operations will be disabled.');
  }

  if (warnings.length > 0 && process.env.NODE_ENV !== 'test') {
    console.log('[Env Validation] Notice:');
    warnings.forEach((w) => console.warn(`  - ${w}`));
  }

  return {
    isValid: true,
    warnings,
  };
};

export default validateEnv;

