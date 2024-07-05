import express from 'express';
import { signup } from '../controllers/userController.js';
const router = express.Router();
router.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from user' });
});

router.post('/signup', signup);

export default router;
