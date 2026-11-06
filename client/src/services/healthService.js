import api from './api';

/**
 * Fetch backend health status
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};
