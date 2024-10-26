import express from 'express';
import { addToWhitelist, updateWhitelist, getWhitelistStatus } from '../controllers/whitelistController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', authenticateToken, addToWhitelist);
router.put('/update', authenticateToken, updateWhitelist);
router.get('/status', authenticateToken, getWhitelistStatus);

export default router;