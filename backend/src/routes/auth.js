import express from 'express';
import { exchangeCode, validateToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/exchange', exchangeCode);
router.get('/validate', validateToken);

export default router;