import { Router } from 'express';
import { LeaderboardEntry } from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find()
      .populate('user', 'name')
      .populate('team', 'name city')
      .sort({ rank: 1 })
      .lean();
    res.status(200).json({
      message: 'Leaderboard loaded',
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    res.status(500).json({ message: 'Failed to load leaderboard' });
  }
});

export default router;
