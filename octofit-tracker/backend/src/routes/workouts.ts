import { Router } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('createdBy', 'name').sort({ createdAt: -1 }).lean();
    res.status(200).json({
      message: 'Workouts loaded',
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    console.error('Error loading workouts:', error);
    res.status(500).json({ message: 'Failed to load workouts' });
  }
});

export default router;
