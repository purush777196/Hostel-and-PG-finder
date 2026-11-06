import { Router } from 'express';
import healthRoutes from './healthRoutes.js';

const router = Router();

// Mount health routes under /api/health
router.use('/health', healthRoutes);

export default router;

