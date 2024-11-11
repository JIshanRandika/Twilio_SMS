// routes/sms.js
import express from 'express';
import { handleSms } from '../controllers/smsController.js';

const router = express.Router();

router.post('/', handleSms);

export default router;
