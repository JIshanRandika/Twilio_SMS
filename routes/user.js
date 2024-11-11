// routes/user.js
import express from 'express';
import { createUser, getAllUsers, updateUser, deleteUser } from '../controllers/smsController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
