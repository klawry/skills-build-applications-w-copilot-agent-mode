import { Router } from 'express';
import { Team } from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name email').sort({ createdAt: -1 }).lean();
    res.status(200).json({
      message: 'Teams loaded',
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    console.error('Error loading teams:', error);
    res.status(500).json({ message: 'Failed to load teams' });
  }
});

export default router;
