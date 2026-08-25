import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Leaderboard.find()
      .sort({ weeklyStart: -1 })
      .populate('entries.team', 'name city')
      .populate('entries.user', 'name')
      .lean();

    res.json({
      resource: 'leaderboard',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'leaderboard',
      message: 'Failed to fetch leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;