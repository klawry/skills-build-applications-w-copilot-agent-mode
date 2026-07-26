import { Router } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .sort({ date: -1 })
      .lean();
    res.status(200).json({
      message: 'Activities loaded',
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    console.error('Error loading activities:', error);
    res.status(500).json({ message: 'Failed to load activities' });
  }
});

export default router;
