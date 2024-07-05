import express from 'express';
import { signup, login } from '../controllers/userController.js';
const router = express.Router();
router.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from user' });
});

router.post('/signup', signup);
router.post('/login', login);

export default router;
