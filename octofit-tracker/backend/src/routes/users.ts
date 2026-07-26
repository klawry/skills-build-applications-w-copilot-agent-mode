import { Router } from 'express';
import { User } from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({
      message: 'Users loaded',
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Error loading users:', error);
    res.status(500).json({ message: 'Failed to load users' });
  }
});

export default router;
