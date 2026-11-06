import { useState, useEffect, useCallback } from 'react';
import { checkHealth } from '../services/healthService';

export const useHealthCheck = () => {
  const [status, setStatus] = useState('checking'); // 'checking' | 'healthy' | 'error'
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const fetchHealth = useCallback(async () => {
    setStatus('checking');
    setError(null);
    try {
      const result = await checkHealth();
      setData(result);
      setStatus('healthy');
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message || 'Unable to connect to backend server');
      setStatus('error');
      setLastChecked(new Date().toLocaleTimeString());
    }
  }, []);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  return {
    status,
    data,
    error,
    lastChecked,
    recheck: fetchHealth,
  };
};

